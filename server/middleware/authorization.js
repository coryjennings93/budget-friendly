const jwt = require("jsonwebtoken");
const AuthenticationError = require("../errors/AuthenticationError");
require("dotenv").config();

const authenticationToken = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (!accessToken) throw new AuthenticationError("Null access token", 401);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Handle expired token
        throw new AuthenticationError("Access token has expired", 401);
      } else {
        // Handle other token validation errors
        next(err);
      }
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticationToken };
