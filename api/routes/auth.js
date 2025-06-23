const { validateRequest } = require("../../middleware/validateRequest");
const userAuthRouter = require("express").Router();
const {
  userLoginController,
  userRegisterController,
} = require("../controllers");

userAuthRouter
  .post(
    "/login",
    validateRequest({
      check_from: "body",
      mustKeys: ["email", "password"],
    }),
    userLoginController
  )
  .post(
    "/register",
    validateRequest({
      check_from: "body",
      mustKeys: ["email", "password"],
    }),
    userRegisterController
  );

module.exports = userAuthRouter;
