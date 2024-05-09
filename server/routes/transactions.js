const {
  getTransactions,
  postTransaction,
  getTransactionsPerBudget,
} = require("../database/queries");
const { authenticateToken } = require("../middleware/authorization");
const { tryCatch } = require("../utils/trycatch");
const jwt = require("jsonwebtoken");
const { addTransactionValidation } = require("../middleware/validator");

const router = require("express").Router();

// get transactions
router
  .route("/")
  .get(
    authenticateToken,
    tryCatch(async (req, res, next) => {
      const accessToken = req.cookies.access_token;
      payload = jwt.decode(accessToken);
      const userId = payload.user_account_id;
      const transactions = await getTransactions(userId);
      res.status(200).json(transactions.rows);
    })
  )
  .post(
    authenticateToken,
    tryCatch(async (req, res, next) => {
      console.log("Request body: ", req.body);
      // get user id from token
      const payload = jwt.decode(req.cookies.access_token);

      const userId = payload.user_account_id;
      // const transactions = await postTransaction(userId);
      // res.status(200).json(transactions.rows);
      try {
        const result = await postTransaction({
          user_account_id: userId,
          transaction_date: req.body.transaction_date,
          transaction_description: req.body.transaction_description,
          category_id: req.body.category_id,
          transaction_amount: req.body.transaction_amount,
          monthly_budget_id: req.body.monthly_budget_id,
        });
        console.log("Result: ", result);
        const transactionsAfterPost = await getTransactionsPerBudget(
          userId,
          req.body.monthly_budget_id
        );
        res.status(200).json(transactionsAfterPost);
      } catch (e) {
        console.log("Error: ", e);
        res.status(500).json({ message: "Error adding transaction" });
      }
    })
  );

// update transactions

// delete transactions

module.exports = router;
