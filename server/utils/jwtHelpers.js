const jwt = require("jsonwebtoken");
const {
  getUser,
  addRefreshToken,
  deleteRefreshToken,
  checkRefreshTokenByUserId,
} = require("../database/queries");
require("dotenv").config();

// standardize the payload in one place
const generateJWTTokens = ({
  user_account_id,
  user_account_name,
  user_account_email,
  user_account_password,
}) => {
  const user = {
    user_account_id,
    user_account_name,
    user_account_email,
    user_account_password,
  };

  const userId = { user_account_id };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
  const refreshToken = jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });
  return { accessToken, refreshToken };
};

const assignTokensToUserAndAddToDB = async (req, res, next) => {
  const { email, password } = req.body;

  // returns the user row from the user_account table
  const user = await getUser(email, password);

  // check if the user already has a refresh token in the database
  // first, query the refresh_token table
  const isRefreshTokenInDB = await checkRefreshTokenByUserId(
    user.user_account_id
  );
  // if the user already has a refresh token, throw an error
  if (isRefreshTokenInDB.rows.length > 0) {
    throw new Error("User already assigned a refresh token.");
  }

  // authenticate user
  let { accessToken, refreshToken } = generateJWTTokens(user);
  res.cookie("access_token", accessToken, { httpOnly: true });
  res.cookie("refresh_token", refreshToken, { httpOnly: true });

  // adds refresh token to the refresh_token table
  addRefreshToken(user.user_account_id, refreshToken);

  res.status(200).json({
    user_id: user.user_account_id,
    accessToken,
    refreshToken,
  });
};

const clearRefreshToken = async (req, res) => {
  if (!req.cookies.refresh_token) {
    throw new Error("No refresh token found in the cookies.");
  }

  if (req.cookies.refresh_token) {
    try {
      res.clearCookie("refresh_token");
      await deleteRefreshToken(req.cookies.refresh_token);
      // .then(() => {
      //   res.clearCookie("refresh_token");
      //   return;
      // })
      // .catch((error) => {
      //   throw new Error("Error deleting refresh token from the database.");
      // });
    } catch (error) {
      throw new Error("No refresh token found in the database.");
    }
  }
};

const clearAccessToken = (req, res) => {
  if (!req.cookies.access_token) {
    throw new Error("No access token found in the cookies.");
  }
  res.clearCookie("access_token");

  return;
};

// const refreshAccessToken = async (req, res) => {

module.exports = {
  generateJWTTokens,
  assignTokensToUserAndAddToDB,
  clearRefreshToken,
  clearAccessToken,
};
