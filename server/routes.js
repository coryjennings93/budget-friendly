const express = require("express");
const { pool } = require("./database/dbConfig");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const { signupValidation, loginValidation } = require("./middleware/validator");
const {
  addNewUser,
  getUser,
  getTransactions,
  findUserById,
  deleteRefreshToken,
  getRefreshToken,
} = require("./database/queries");
const jwt = require("jsonwebtoken");
const errorHandler = require("./middleware/errorHandler");
const { tryCatch } = require("./utils/trycatch");
const {
  generateJWTTokens,
  assignTokensToUserAndAddToDB,
  clearRefreshToken,
  clearAccessToken,
} = require("./utils/jwtHelpers");
const ValidationError = require("./errors/ValidationError");
const { authenticateToken } = require("./middleware/authorization");
const AuthenticationError = require("./errors/AuthenticationError");
const { hashPassword, comparePassword } = require("./utils/bcryptHelpers");

// const app = express();

const router = express.Router();

router.route("/test").get(
  tryCatch(async (req, res, next) => {
    res.json({ message: "Test route" });
    console.log("Test was hit");
  })
);

router.route("/users").get(
  tryCatch(async (req, res, next) => {
    const allUsers = await pool.query("SELECT * FROM user_account");
    res.json(allUsers.rows);
  })
);

router.route("/register").post(
  [signupValidation],
  tryCatch(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result.array());
    }
    const hashedPassword = await hashPassword(password);
    addNewUser(name, email, hashedPassword);
    next();
  }),

  tryCatch(async (req, res, next) => {
    await assignTokensToUserAndAddToDB(req, res, next);
  })

  // send back cookie/ token to the client
  // res.json({
  //   tokens: {
  //     accessToken,
  //     refreshToken,
  //   },
  // });
  // res.status(200).json({ message: "User registered" });
);

router.route("/login").post(
  [loginValidation],
  tryCatch(async (req, res, next) => {
    // validation logic
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // customization for handling the express-validator validation errors
      throw new ValidationError(result.array());
    }

    next();
  }),
  tryCatch(async (req, res, next) => {
    await assignTokensToUserAndAddToDB(req, res, next);
  })
);

router.route("/logout").get(
  tryCatch(async (req, res, next) => {
    await clearRefreshToken(req, res);
    clearAccessToken(req, res);
    res.status(200).json({ message: "Token cleared" });
  })
);

// this route provides the client with the user account details upon loging in
router.route("/profile").get(
  authenticateToken,
  tryCatch(async (req, res, next) => {
    const userId = req.user_account_id;
    const user = await findUserById(userId);
    if (user.rows.length === 0 || user.rows.length > 1) {
      throw new AuthenticationError("Invalid user", 401);
    }

    res.json(user.rows[0]);
  })
);

// route to provide a way to refresh the access token
router.route("/refresh_token").get(
  tryCatch(async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      throw new AuthenticationError(
        "Access denied. No refresh token provided",
        401
      );

    // check to make sure refresh token is found in database
    const refreshTokenInDB = await getRefreshToken(refreshToken);
    if (
      refreshTokenInDB.rows.length === 0 ||
      refreshTokenInDB.rows.length > 1
    ) {
      throw new AuthenticationError("Invalid refresh token", 401);
    }

    let decodedPayload;
    try {
      decodedPayload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.clearCookie("refresh_token");
        // delete token from database
        await deleteRefreshToken(refreshToken);
        throw new AuthenticationError("Refresh token has expired", 401);
      }
      res.clearCookie("refresh_token");
      if (error) throw new AuthenticationError("Invalid refresh token");
    }

    const { user_account_id } = decodedPayload;

    const user_account_records = await findUserById(user_account_id);

    // handle any errors from the above query
    if (
      user_account_records.rows.length === 0 ||
      user_account_records.rows.length > 1
    ) {
      res.clearCookie("refresh_token");
      throw new AuthenticationError(
        "Error with account email registration. Contact customer support."
      );
    }

    // if no errors above, there should be only one user record returned from the query
    const user_account_record = user_account_records.rows[0];

    // check if the token needs to be refreshed
    res.clearCookie("access_token");
    let { accessToken } = generateJWTTokens(user_account_record);
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.status(200).json({
      accessToken,
    });
  })
);

// verify access token from client to make sure it is not expired
router.route("/verifyAccessToken").get(
  tryCatch(async (req, res, next) => {
    const originalAccessToken = req.cookies.access_token;
    if (!originalAccessToken) {
      throw new AuthenticationError("Null access token", 401);
    }

    try {
      jwt.verify(originalAccessToken, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({ originalAccessToken });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // verify that the refresh token is not expired and get a new access token
        try {
          const refreshToken = req.cookies.refresh_token;
          if (!refreshToken) {
            throw new AuthenticationError(
              "Access denied. No refresh token provided",
              401
            );
          }
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
          // if the refresh token is valid, generate a new access token
          const payload = jwt.decode(refreshToken);
          const user = await findUserById(payload.user_account_id);
          const { accessToken } = generateJWTTokens(user.rows[0]);
          // still need to add user to access token
          res.cookie("access_token", accessToken, { httpOnly: true });
          return res.status(200).json({ accessToken });
        } catch (error) {
          if (error.name === "TokenExpiredError") {
            clearRefreshToken(req, res);
            clearAccessToken(req, res);
            await deleteRefreshToken(refreshToken);

            throw new AuthenticationError("Refresh token has expired", 401);
          }
          throw new AuthenticationError("Invalid refresh token", 401);
        }
      }
      throw new AuthenticationError("Invalid access token", 401);
    }
  })
);

// logout functionality
router.route("/logout").get(
  tryCatch(async (req, res) => {
    console.log(res.cookies);
    await clearRefreshToken(req, res);
    clearAccessToken(req, res);

    res.status(200).json({ message: "You have successfully been logged out." });
  })
);

// return accress token value since it is http only cookie the front end cannot read it
router.route("/returnAccessToken").get(
  tryCatch(async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    res.json({ accessToken });
  })
);

module.exports = router;
