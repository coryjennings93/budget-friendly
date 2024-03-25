const { check, body, validationResult } = require("express-validator");
const { getEmail } = require("../database/queries");
const bcrypt = require("bcrypt");
const InvalidCredentialsError = require("../errors/InvalidCredentialsError");

const isEmailInUse = async (email) => {
  const emailResult = await getEmail(email);
  if (emailResult.length > 0) {
    throw new Error("Email already in use");
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
  const validPassword = await bcrypt.compare(
    password,
    user[0].user_account_password
  );
  if (!validPassword) {
    throw new InvalidCredentialsError("The password is incorrect.");
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
