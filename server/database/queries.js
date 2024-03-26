const InvalidCredentialsError = require("../errors/InvalidCredentialsError");
const { comparePassword } = require("../utils/bcryptHelpers");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

// get email
const getEmail = async (email) => {
  const user = await pool.query(
    "SELECT * FROM user_account WHERE user_account_email = $1",
    [email]
  );
  return user.rows;
};

// register a new user
const addNewUser = async (name, email, password) => {
  try {
    const newUser = await pool.query(
      "INSERT INTO user_account (user_account_name, user_account_email, user_account_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    return newUser.rows[0];
  } catch (error) {
    console.log("Error from addNewUser function: ", error);
  }
};

const getUser = async (email, password) => {
  // gets the user row from the user_account table
  const user = await getEmail(email);

  if (user[0].length === 0 || user[0].length > 1) {
    throw new InvalidCredentialsError(
      "Error with account email registration. Contact customer support."
    );
  }

  // Compare the hashed password stored in the database with the hashed password provided by the user
  const isPasswordValid = comparePassword(
    password,
    user[0].user_account_password
  );
  if (!isPasswordValid) {
    throw new InvalidCredentialsError("The password is incorrect.");
  }
  return user[0];
};

const getTransactions = async (user_id) => {
  const transactions = await pool.query(
    "SELECT * FROM transaction WHERE user_account_id = $1",
    [user_id]
  );
  return transactions;
};

module.exports = { getEmail, addNewUser, getUser, getTransactions };
