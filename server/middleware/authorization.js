const jwt = require("jsonwebtoken");
const AuthenticationError = require("../errors/AuthenticationError");
const { getRefreshToken, findUserById } = require("../database/queries");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  try {
    // const accessToken = req.cookies.access_token;
    // const authHeader = req.headers["authorization"];
    // const accessToken = authHeader && authHeader.split(" ")[1];
    console.log("req.cookies: ", req.cookies);
    const accessToken = req.cookies.access_token;
    if (!accessToken) throw new AuthenticationError("Null access token", 401);

    //get refreshToken from cookie
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new AuthenticationError(
        "Access denied. No refresh token provided",
        401
      );
    }

    // check to see if the provided refreshToken from cookies is found in the refresh_token table
    const refreshTokenInDB = await getRefreshToken(refreshToken);
    if (
      refreshTokenInDB.rows.length === 0 ||
      refreshTokenInDB.rows.length > 1
    ) {
      throw new AuthenticationError("Invalid refresh token", 401);
    }

    let decodedPayload;
    try {
      decodedPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // Handle expired token
        throw new AuthenticationError("Access token has expired", 401);
      } else {
        // Handle other token validation errors
        throw new AuthenticationError("Access token has expired", 401);
      }
    }

    const user = await findUserById(decodedPayload.user_account_id);
    if (user.rows.length === 0 || user.rows.length > 1) {
      throw new AuthenticationError("Invalid user", 401);
    }
    const userId = user.rows[0].user_account_id;
    req.user_account_id = userId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateToken };
