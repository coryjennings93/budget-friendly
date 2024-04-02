const AuthenticationError = require("../errors/AuthenticationError");
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

const findUserById = async (id) => {
  const user = await pool.query(
    "SELECT * FROM user_account WHERE user_account_id = $1",
    [id]
  );

  return user;
};

const getTransactions = async (user_id) => {
  const transactions = await pool.query(
    "SELECT * FROM transaction WHERE user_account_id = $1",
    [user_id]
  );
  return transactions;
};

const addRefreshToken = async (user_account_id, refresh_token) => {
  await pool.query(
    "INSERT INTO refresh_token (user_account_id, refresh_token) VALUES ($1, $2)",
    [user_account_id, refresh_token]
  );
};

const getRefreshToken = async (refreshToken) => {
  const refreshTokenRecords = await pool.query(
    "SELECT * FROM refresh_token WHERE refresh_token = $1",
    [refreshToken]
  );
  return refreshTokenRecords;
};

// check to see if user_account_id is in the refresh_token table
const checkRefreshTokenByUserId = async (user_account_id) => {
  const refreshTokenRecords = await pool.query(
    "SELECT * FROM refresh_token WHERE user_account_id = $1",
    [user_account_id]
  );
  return refreshTokenRecords;
};

const deleteRefreshToken = async (refreshToken) => {
  await pool.query("DELETE FROM refresh_token WHERE refresh_token = $1", [
    refreshToken,
  ]);
};

module.exports = {
  getEmail,
  addNewUser,
  getUser,
  findUserById,
  getTransactions,
  addRefreshToken,
  deleteRefreshToken,
  getRefreshToken,
  checkRefreshTokenByUserId,
};
