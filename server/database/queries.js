const AuthenticationError = require("../errors/AuthenticationError");
const InvalidCredentialsError = require("../errors/InvalidCredentialsError");
const QueryError = require("../errors/QueryError");
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

// Transaction Queries
const getTransactions = async (user_id) => {
  const transactions = await pool.query(
    "SELECT * FROM transaction WHERE user_account_id = $1",
    [user_id]
  );
  return transactions;
};

const postTransaction = async (
  user_id,
  transaction_date,
  transaction_description,
  transaction_type,
  category_id,
  bank_account_id,
  transaction_amount
) => {
  try {
    await pool.query(
      "INSERT INTO transaction (user_account_id, transaction_date, transaction_description, transaction_type, category_id, bank_account_id, transaction_amount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        user_id,
        transaction_date,
        transaction_description,
        transaction_type,
        category_id,
        bank_account_id,
        transaction_amount,
      ]
    );
    return;
  } catch (e) {
    throw new QueryError(e);
  }
};

// get all budgets for a user
const getBudgets = async (user_id) => {
  const budgets = await pool.query(
    "SELECT * FROM monthly_budget WHERE user_account_id = $1",
    [user_id]
  );
  return budgets.rows;
};

// returns the user ID so that we can use it to insert into the budget_by_category table
const postBudget = async ({
  monthly_budget_amount,
  monthly_budget_month,
  monthly_budget_year,
  user_account_id,
  monthly_budget_name,
}) => {
  try {
    const results = await pool.query(
      "INSERT INTO monthly_budget (monthly_budget_amount, monthly_budget_month, monthly_budget_year, user_account_id, monthly_budget_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        monthly_budget_amount,
        monthly_budget_month,
        monthly_budget_year,
        user_account_id,
        monthly_budget_name,
      ]
    );
    return results.rows[0];
  } catch (e) {
    throw new QueryError(e);
  }
};

const getCategories = async (user_id) => {
  const categories = await pool.query(
    "SELECT * FROM category WHERE user_account_id = $1",
    [user_id]
  );
  return categories.rows;
};

const getCategoriesPerBudget = async (user_id, budget_id) => {
  const categories = await pool.query(
    "SELECT * FROM category WHERE user_account_id = $1 AND category_id IN (SELECT category_id FROM budget_by_category WHERE monthly_budget_id = $2)",
    [user_id, budget_id]
  );
  return categories.rows;
};

const checkCategoryAndReturnID = async (category, user) => {
  // capitalize first letter in case it is not
  const category_name = category.charAt(0).toUpperCase() + category.slice(1);

  const categoryResult = await pool.query(
    "SELECT category_id FROM category WHERE category_name = $1 AND user_account_id = $2",
    [category_name, user]
  );
  console.log("Category result: ", categoryResult.rows);
  if (categoryResult.rows.length > 1) {
    throw new QueryError("Error with category query");
  }
  return categoryResult.rows;
};

const postCategory = async ({ category_name, user_account_id }) => {
  try {
    const results = await pool.query(
      "INSERT INTO category (category_name, user_account_id) VALUES ($1, $2) RETURNING *",
      [category_name, user_account_id]
    );
    return results.rows[0];
  } catch (e) {
    throw new QueryError(e);
  }
};

const insertIntoBudgetByCategory = async ({
  monthly_budget_id,
  category_id,
  budget_by_category_amount,
}) => {
  try {
    await pool.query(
      "INSERT INTO budget_by_category (monthly_budget_id, category_id, budget_by_category_amount) VALUES ($1, $2, $3)",
      [monthly_budget_id, category_id, budget_by_category_amount]
    );
    return;
  } catch (e) {
    throw new QueryError(e);
  }
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
  getBudgets,
  postBudget,
  getCategories,
  getCategoriesPerBudget,
  checkCategoryAndReturnID,
  postCategory,
  insertIntoBudgetByCategory,
};
