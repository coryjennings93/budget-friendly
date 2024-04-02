const { getTransactions } = require("../database/queries");
const { authenticateToken } = require("../middleware/authorization");
const { tryCatch } = require("../utils/trycatch");

const router = require("express").Router();

// get transactions
router.route("/").get(
  authenticateToken,
  tryCatch(async (req, res, next) => {
    const userId = req.user.user_account_id;
    const transactions = await getTransactions(userId);
    res.status(200).json(transactions.rows);
  })
);

// update transactions

// delete transactions

module.exports = router;
