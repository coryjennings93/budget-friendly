const jwt = require("jsonwebtoken");
require("dotenv").config();

// standardize the payload in one place
const jwtTokens = (user_id, user_name, user_email) => {
  const user = { user_id, user_name, user_email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10s",
  });
  return { accessToken, refreshToken };
};

module.exports = { jwtTokens };
