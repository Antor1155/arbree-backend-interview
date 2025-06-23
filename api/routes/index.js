const router = require("express").Router();
const userAuthRoutes = require("./auth");
const eventRoutes = require("./event");

router.use("/auth", userAuthRoutes);
router.use("/event", eventRoutes);

module.exports = router;
