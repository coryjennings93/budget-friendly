const {
  getTransactions,
  postBudget,
  checkCategoryAndReturnID,
  getBudgets,
  getCategoriesPerBudget,
  insertIntoBudgetByCategory,
} = require("../database/queries");
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
      const accessToken = req.cookies.access_token;
      payload = jwt.decode(accessToken);
      const userId = payload.user_account_id;
      const budgets = await getBudgets(userId);
      res.status(200).json(budgets);
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

      // check to make sure monthly budget name doesn't already exist
      const budgets = await getBudgets(userId);
      if (budgets.length > 0) {
        for (let i = 0; i < budgets.length; i++) {
          if (budgets[i].monthly_budget_name === req.body.budget_name) {
            res.status(400).json({ message: "Budget name already exists" });
            return;
          }
        }
      }

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

      // load categories into the budget_by_category table
      const categories = req.body.budget_categories;
      console.log("Category length: ", req.body.budget_categories.length);
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const category_id = await checkCategoryAndReturnID(
          category.category,
          userId
        );
        const realCategory_id = category_id[0].category_id;
        const budget_by_category = {
          monthly_budget_id,
          category_id: realCategory_id,
          budget_by_category_amount: category.categoryAmount,
        };
        console.log("Budget by category: ", budget_by_category);
        await insertIntoBudgetByCategory(budget_by_category);
      }
      const budgetsAfterPost = await getBudgets(userId);

      res.status(201).json(budgetsAfterPost);
    })
  );

router.route("/:budget/categories").get(
  authenticateToken,
  tryCatch(async (req, res, next) => {
    const budgetId = req.params.budget;
    console.log("Budget ID: ", budgetId);
    const accessToken = req.cookies.access_token;
    payload = jwt.decode(accessToken);
    const userId = payload.user_account_id;
    const categories = await getCategoriesPerBudget(userId, budgetId);
    console.log("Categories per: ", categories);
    res.status(200).json(categories);
  })
);

// update budget

// delete budget

module.exports = router;
