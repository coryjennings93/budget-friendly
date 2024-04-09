const { check, body, validationResult } = require("express-validator");
const { getEmail, getCategory } = require("../database/queries");
const bcrypt = require("bcrypt");
const InvalidCredentialsError = require("../errors/InvalidCredentialsError");
const e = require("express");

const isEmailInUse = async (email) => {
  const emailResult = await getEmail(email);
  if (emailResult.length > 0) {
    throw new InvalidCredentialsError(
      "This email address is already registered."
    );
  }
};

const validEmail = async (email) => {
  const emailResult = await getEmail(email);
  if (emailResult.length === 0) {
    throw new Error("Email not found");
  }
};

const validPassword = async (password, { req }) => {
  const email = req.body.email;
  const user = await getEmail(email);
  // only checks the password if the email is found
  if (user.length !== 0) {
    const validPassword = await bcrypt.compare(
      password,
      user[0].user_account_password
    );
    if (!validPassword) {
      throw new InvalidCredentialsError("The password is incorrect.");
    }
  }
};

const validCategory = async (category, { req }) => {
  const user = req.body.user_id;
  const categoryResult = await getCategory(category, user);
  console.log("Category result: ", categoryResult);
  console.log("Req result: ", req.body);
  if (categoryResult.length > 0) {
    throw new InvalidCredentialsError("Category already exists");
  }
};

exports.signupValidation = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ max: 70 })
    .withMessage("Name is too long"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isLength({ max: 255 })
    .withMessage("Email is too long")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail()
    .bail()
    .custom(isEmailInUse),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 8,
      max: 70,
    })
    .withMessage(
      "Password must be 8 characters long, no more than 70 characters long"
    ),
  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Password confirmation is required")
    .isLength({
      min: 8,
      max: 70,
    })
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      } else {
        return value;
      }
    }),
];

exports.loginValidation = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isLength({ max: 255 })
    .withMessage("Invalid Email")
    .bail()
    .custom(validEmail),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({
      max: 70,
    })
    .withMessage("Invalid password")
    .bail()
    .custom(validPassword),
];

exports.addTransactionValidation = [
  body("date").trim().not().isEmpty().withMessage("Please select a date"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({
      max: 70,
    })
    .withMessage("Invalid password")
    .bail()
    .custom(validPassword),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isLength({ max: 255 })
    .withMessage("Invalid Email")
    .bail()
    .custom(validEmail),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({
      max: 70,
    })
    .withMessage("Invalid password")
    .bail()
    .custom(validPassword),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isLength({ max: 255 })
    .withMessage("Invalid Email")
    .bail()
    .custom(validEmail),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({
      max: 70,
    })
    .withMessage("Invalid password")
    .bail()
    .custom(validPassword),
];

exports.newBudgetValidation = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please select a month.")
    .isLength({
      max: 70,
    })
    .withMessage("Name cannot be more than 70 characters long."),
  body("month").trim().not().isEmpty().withMessage("Please select a month."),
  body("year").trim().not().isEmpty().withMessage("Please select a year."),
  body("budgetAmount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Budget amount is required."),
  body("categories").isArray(),
  body("*.category")
    .trim()
    .not()
    .isEmpty()
    .withMessage("All categories must be selected"),
  body("*.categoryAmount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("All category amounts must be provided")
    .isNumeric(),
];

exports.newCategoryValidation = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide the name of a category.")
    .isLength({
      max: 70,
    })
    .withMessage("Name cannot be more than 70 characters long.")
    .bail()
    .custom(validCategory),
];
