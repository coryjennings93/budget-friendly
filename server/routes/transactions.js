const { getTransactions } = require("../database/queries");
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
      console.log("User ID: ", userId);
      // const transactions = await postTransaction(userId);
      // res.status(200).json(transactions.rows);

      res.status(200).json({ message: "Transaction added" });
    })
  );

// update transactions

// delete transactions

module.exports = router;
