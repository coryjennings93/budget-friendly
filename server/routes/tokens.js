const { tryCatch } = require("../utils/trycatch");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router
  .route("/")
  .get(
    // respond with an access and refresh token
    tryCatch(async (req, res, next) => {
      const accessToken = req.cookies.access_token;
      payload = jwt.decode(accessToken);
      const userId = payload.user_account_id;
      const budgets = await getBudgets(userId);
      res.status(200).json(budgets);
    })
  )