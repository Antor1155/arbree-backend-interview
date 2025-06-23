const router = require("express").Router();
const userAuthRoutes = require("./auth");

router.use("/auth", userAuthRoutes);

module.exports = router;
