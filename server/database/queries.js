const { pool } = require("./dbConfig");

// get email
const getEmail = async (email) => {
  try {
    const user = await pool.query(
      "SELECT * FROM user_account WHERE user_account_email = $1",
      [email]
    );
    return user.rows;
  } catch (error) {
    console.log(error);
  }
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
    console.log(error);
  }
};

module.exports = { getEmail, addNewUser };
