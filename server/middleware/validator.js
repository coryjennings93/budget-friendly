const { check, body } = require("express-validator");
const { getEmail } = require("../database/queries");

const isEmailInUse = async (email) => {
  if (getEmail(email)) {
    throw new Error("Email already in use");
  }
};

exports.signupValidation = [
  body("name").trim().not().isEmpty().withMessage("Name is required"),
  body("email", "Please enter a valid email")
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .custom(isEmailInUse),

  body("password", "Password must be 8 characters long")
    .not()
    .isEmpty()
    .isLength({
      min: 8,
    }),
  body("confirmPassword", "Passwords do not match").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    } else {
      return value;
    }
  }),
];
