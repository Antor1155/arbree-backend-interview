const { validateRequest } = require("../../middleware/validateRequest");
const userAuthRouter = require("express").Router();
const { userLoginController } = require("../controllers");

userAuthRouter.post(
  "/login",
  validateRequest({
    check_from: "body",
    mustKeys: ["name", "password"],
  }),
  userLoginController
);

module.exports = userAuthRouter;
