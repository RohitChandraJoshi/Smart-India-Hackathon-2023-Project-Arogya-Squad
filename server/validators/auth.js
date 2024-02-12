const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validateSignUp = [
  check("firstName")
    .notEmpty()
    .withMessage("First Name cannot be empty! ")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First Name should contain alphabets and spaces only"),
  check("lastName")
    .notEmpty()
    .withMessage("Last Name cannot be empty! ")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last Name should contain alphabets and spaces only"),
  check("email").notEmpty().withMessage("Email cannot be empty"),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be strong. It should have at least 8 characters, including uppercase, lowercase, numbers, and special characters."
    ),
];


const validateSignIn = [
  check("email").notEmpty().withMessage("Fill in the email!"),
  check("password").notEmpty().withMessage("Fill in the password"),
];

const validateTask = [
  check("title").notEmpty().withMessage("Title cannot be empty"),
  check("description").notEmpty().withMessage("Description cannot be empty"),
];

const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: errors.array()[0].msg });
  next();
};
module.exports = {
  validateSignIn,
  validateSignUp,
  validateTask,
  isRequestValidated,
};
