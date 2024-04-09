const routes = require("./routes");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const transactionRoutes = require("./routes/transactions");
const budgetRoutes = require("./routes/budgets");
const categoryRoutes = require("./routes/categories");

const app = express();

app.use(cookieParser());

// middleware that allows us to send details from the frontend
app.use(express.urlencoded({ extended: false }));

// this will give the express app the ability to parse requests with JSON payloads
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

// Use the router
app.use("/api/v1/", routes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/budgets", budgetRoutes);
app.use("/api/v1/categories", categoryRoutes);

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
