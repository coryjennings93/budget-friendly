const {
  getTransactions,
  postBudget,
  checkCategoryAndReturnID,
  getBudgets,
  getCategoriesPerBudget,
  insertIntoBudgetByCategory,
  getTransactionsPerBudget,
  deleteBudgetByCategory,
  updateBudget,
  deleteBudget,
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
        await insertIntoBudgetByCategory(budget_by_category);
      }
      const budgetsAfterPost = await getBudgets(userId);

      res.status(201).json(budgetsAfterPost);
    })
  )
  .put(
    authenticateToken,
    [newBudgetValidation],
    tryCatch(async (req, res, next) => {
      // get user id from token
      const payload = jwt.decode(req.cookies.access_token);
      const userId = payload.user_account_id;
      console.log("Hi from put route");

      // create the object to send to the postBudget function
      const budget = {
        monthly_budget_id: req.body.budget_id,
        monthly_budget_amount: req.body.budget_amount,
        monthly_budget_month: req.body.budget_month,
        monthly_budget_year: req.body.budget_year,
        user_account_id: userId,
        monthly_budget_name: req.body.budget_name,
      };

      const result = await updateBudget(budget);
      console.log("Result aftert update: ", result);

      // update budget_by_category table
      // easiest way to do this since the primary key is both the category_id and the monthly_budget_id is to
      // delete all the rows for the budget and then reinsert them
      // because there isn't a good way to update the row if the user changes the category

      // delete all rows for the budget
      await deleteBudgetByCategory(budget.monthly_budget_id);

      // reinsert the rows
      const categories = req.body.budget_categories;
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const category_id = await checkCategoryAndReturnID(
          category.category,
          userId
        );
        const realCategory_id = category_id[0].category_id;
        const budget_by_category = {
          monthly_budget_id: req.body.budget_id,
          category_id: realCategory_id,
          budget_by_category_amount: category.categoryAmount,
        };
        await insertIntoBudgetByCategory(budget_by_category);
      }
      const budgetsAfterUpdate = await getBudgets(userId);

      res.status(200).json(budgetsAfterUpdate);
    })
  )
  .delete(
    authenticateToken,
    tryCatch(async (req, res, next) => {
      try {
        // get user id from token
        const payload = jwt.decode(req.cookies.access_token);
        const userId = payload.user_account_id;

        // create budget to send to delete
        const budget = {
          monthly_budget_id: req.body.monthly_budget_id,
        };
        console.log("HIII from DELETE BUDGET ROUTE");
        const newBudgetsList = await deleteBudget(budget).then(async () => {
          return await getBudgets(userId);
        });
        res.status(200).json(newBudgetsList);
      } catch (e) {
        res.status(500).json({ message: "Error deleting budget" });
      }
    })
  );

router.route("/:budget/categories").get(
  authenticateToken,
  tryCatch(async (req, res, next) => {
    const budgetId = req.params.budget;
    console.log("Budget ID: ", budgetId);
    const accessToken = req.cookies.access_token;
    const payload = jwt.decode(accessToken);
    const userId = payload.user_account_id;
    const categories = await getCategoriesPerBudget(userId, budgetId);
    console.log("Categories per: ", categories);
    res.status(200).json(categories);
  })
);

// update budget

// delete budget

// get transactions for a budget
router.route("/:budget/transactions").get(
  authenticateToken,
  tryCatch(async (req, res, next) => {
    const budgetId = req.params.budget;
    const accessToken = req.cookies.access_token;
    const payload = jwt.decode(accessToken);
    const userId = payload.user_account_id;
    const transactions = await getTransactionsPerBudget(userId, budgetId);
    res.status(200).json(transactions);
  })
);

module.exports = router;
