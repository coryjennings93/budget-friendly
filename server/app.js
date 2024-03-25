const router = require("./routes");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cookieParser());

// middleware that allows us to send details from the frontend
app.use(express.urlencoded({ extended: false }));

// this will give the express app the ability to parse requests with JSON payloads
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  })
);

// Use the router
app.use("/api/v1/", router);

// call for all requests that don't match the routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;
