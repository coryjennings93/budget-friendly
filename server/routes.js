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

// const app = express();

const router = express.Router();

router.route("/users").get(
  tryCatch(async (req, res, next) => {
    const allUsers = await pool.query("SELECT * FROM user_account");
    res.json(allUsers.rows);
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

    // authenticate user
    let { accessToken, refreshToken } = jwtTokens(user);
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

router.route("/register").post(
  [signupValidation],
  tryCatch(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    addNewUser(name, email, hashedPassword);

    res.status(200).json({ message: "User registered" });
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
