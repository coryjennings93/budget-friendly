const { getTransactions, postBudget } = require("../database/queries");
const { authenticateToken } = require("../middleware/authorization");
const { tryCatch } = require("../utils/trycatch");
const jwt = require("jsonwebtoken");
const { newBudgetValidation } = require("../middleware/validator");

const router = require("express").Router();

// get budgets
router
  .route("/")
  .get(
    authenticateToken,
    tryCatch(async (req, res, next) => {
      //   const accessToken = req.cookies.access_token;
      //   payload = jwt.decode(accessToken);
      //   const userId = payload.user_account_id;
      //   const transactions = await getTransactions(userId);
      //   res.status(200).json(transactions.rows);
    })
  )
  .post(
    authenticateToken,
    [newBudgetValidation],
    tryCatch(async (req, res, next) => {
      //   console.log("categories ", req.body.categories.length);
      // get user id from token
      const payload = jwt.decode(req.cookies.access_token);

      const userId = payload.user_account_id;
      console.log("User ID: ", userId);

      // create the object to send to the postBudget function
      const budget = {
        monthly_budget_amount: req.body.budget_amount,
        monthly_budget_month: req.body.budget_month,
        monthly_budget_year: req.body.budget_year,
        user_account_id: userId,
        monthly_budget_name: req.body.budget_name,
      };
      const result = await postBudget(budget);
      const monthly_budget_id = result.monthly_budget_id;
      //   for (let i = 0; i < req.body.budget_categories.length; i++) {
      //     const category = req.body.categories[i];
      //     const category_id = category.category_id;
      //     const budget_by_category = {
      //       monthly_budget_id,
      //       category_id,
      // res.status(200).json(transactions.rows);

      res.status(200).json({ message: "Transaction added" });
    })
  );

// update budget

// delete budget

module.exports = router;
