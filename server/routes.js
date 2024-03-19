const express = require("express");
const { pool } = require("./database/dbConfig");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const { signupValidation } = require("./middleware/validator");
const { addNewUser } = require("./database/queries");

const app = express();

// middleware that allows us to send details from the frontend
app.use(express.urlencoded({ extended: false }));

// this will give the express app the ability to parse requests with JSON payloads
app.use(express.json());
app.use(cors());

app.use("/api/v1/", routes);

// example route
app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

// register users
app.post("/register", [signupValidation], async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // console.log(req.body);

    // res.status(200).send(newUser.rows[0]);
    // let errors = [];
    // const errors = validationResult(req);

    // validation checks
    // if (!name || !email || !password || !confirmPassword) {
    //   errors.push({ message: "Please fill in all fields" });
    // }
    // if (password.length < 6) {
    //   errors.push({ message: "Password should be at least 6 characters" });
    // }
    // if (password !== confirmPassword) {
    //   errors.push({ message: "Passwords do not match" });
    // }
    // if (errors.length > 0) {
    //   res.send(errors);
    // } else {
    //   const user = await pool.query(
    //     "SELECT * FROM user_account WHERE user_account_email = $1",
    //     [email]
    //   );
    //   console.log(user);

    //   if (user.rows.length > 0) {
    //     return res.status(401).send("User already exists");
    //   }

    const result = validationResult(req);
    if (result.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      addNewUser(name, email, hashedPassword);

      res.get("/dashboard", (req, res) => {
        res.send("Welcome to the dashboard");
      });
    }

    res.send({ errors: result.array() });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// get users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM user_account");
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get transactions assocaited with authenticated user
app.get("/transactions", async (req, res) => {
  try {
    const allTransactions = await pool.query("SELECT * FROM transaction");
    res.json(allTransactions.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// update transactions

// delete transactions

app.get("/", (req, res) => {
  res.send("Helldo World");
});

module.exports = { app };
