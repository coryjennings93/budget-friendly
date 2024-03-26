const express = require("express");
const { pool } = require("./database/dbConfig");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const { signupValidation, loginValidation } = require("./middleware/validator");
const { addNewUser, getUser, getTransactions } = require("./database/queries");
const jwt = require("jsonwebtoken");
const errorHandler = require("./middleware/errorHandler");
const { tryCatch } = require("./utils/trycatch");
const { jwtTokens } = require("./utils/jwtHelpers");
const ValidationError = require("./errors/ValidationError");
const { authenticationToken } = require("./middleware/authorization");
const AuthenticationError = require("./errors/AuthenticationError");
const { hashPassword, comparePassword } = require("./utils/bcryptHelpers");

// const app = express();

const router = express.Router();

router.route("/users").get(
  tryCatch(async (req, res, next) => {
    const allUsers = await pool.query("SELECT * FROM user_account");
    res.json(allUsers.rows);
  })
);

router.route("/register").post(
  [signupValidation],
  tryCatch(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result.array());
    }
    const hashedPassword = await hashPassword(password);
    addNewUser(name, email, hashedPassword);
    console.log("User registered");

    // login user and provide a token
    const user = await getUser(email, password);
    // if user

    let { accessToken, refreshToken } = jwtTokens(user);
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    // send back cookie/ token to the client
    res.json({
      tokens: {
        accessToken,
        refreshToken,
      },
    });
    // res.status(200).json({ message: "User registered" });
  })
);

router.route("/login").post(
  [loginValidation],
  tryCatch(async (req, res, next) => {
    const { email, password } = req.body;

    // validation logic
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // customization for handling the express-validator validation errors
      throw new ValidationError(result.array());
    }

    // returns the user row from the user_account table
    const user = await getUser(email, password);

    const userId = user.user_account_id;

    // authenticate user
    let { accessToken, refreshToken } = jwtTokens(user);
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    // res.json({
    //   tokens: {
    //     accessToken,
    //     refreshToken,
    //   },
    // });

    res.status(200).json({ message: "Logged in" });
  })
);

router.route("/logout").get(
  tryCatch(async (req, res, next) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({ message: "Logged out" });
  })
);

router.route("/profile").get(
  authenticationToken,
  tryCatch(async (req, res, next) => {
    const userEmail = req.user.user_id.user_account_email;
    const userPassword = req.user.user_id.user_account_password;
    const user = await getUser(userEmail, userPassword);

    res.json(user);
  })
);

// refresh token
router.route("/refresh_token").get(
  tryCatch(async (req, res) => {
    const oldRefreshToken = req.cookies.refresh_token;
    if (!oldRefreshToken) {
      return res
        .status(401)
        .json({ message: "Access denied. No refresh token provided." });
    }

    jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) throw new AuthenticationError("Invalid token");
        console.log(user);

        // const user = await getUser(user.email, user.password);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const decoded = jwt.verify(
          oldRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        // check if the token needs to be refreshed
        let { accessToken, refreshToken } = jwtTokens(user);
        res.cookie("refresh_token", refreshToken, { httpOnly: true });
        res.json({
          tokens: {
            accessToken,
            refreshToken,
          },
        });
      }
    );
  })
);

// get transactions
router.route("/transactions").get(
  authenticationToken,
  tryCatch(async (req, res, next) => {
    const userId = req.user.user_account_id;
    const transactions = await getTransactions(userId);
    res.json(transactions.rows);
  })
);

// update transactions

// delete transactions

module.exports = router;
