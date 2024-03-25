const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Berarer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401).json({ error: "Null token" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({ error: err.message });
    req.user = user;
    next();
  });
};

module.exports = { authenticationToken };
