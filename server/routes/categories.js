const {
  getTransactions,
  postBudget,
  postCategory,
} = require("../database/queries");
const { authenticateToken } = require("../middleware/authorization");
const { tryCatch } = require("../utils/trycatch");
const jwt = require("jsonwebtoken");
const { newCategoryValidation } = require("../middleware/validator");
const { validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");

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
    [newCategoryValidation],
    authenticateToken,
    tryCatch(async (req, res, next) => {
      console.log("Request body: ", req.body);
      // check validation first
      const resultFromValidation = validationResult(req);
      if (!resultFromValidation.isEmpty()) {
        throw new ValidationError(resultFromValidation.array());
      }

      //   console.log("categories ", req.body.categories.length);
      // get user id from token
      const payload = jwt.decode(req.cookies.access_token);

      const userId = payload.user_account_id;
      console.log("User ID: ", userId);

      // create the object to send to the postBudget function
      const category = {
        category_name: req.body.name,
        user_account_id: userId,
      };
      const result = await postCategory(category);
      const category_id = result.category_id;
      console.log("Category ID: ", category_id);
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
