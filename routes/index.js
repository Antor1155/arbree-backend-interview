const router = require("express").Router();

const api = require("../api/routes/index");

router.all("/server-status", (req, res, next) => {
  try {
    return res.json({
      message: "Server running",
      tau: global.activeUser || 0,
      atdb: aladinDistributableBeans || 0,
      atdp: aladinDistributionPercentage || 0,
      luckyBank: global.luckyGiftBank || 0,
      server: process.env.NODE_ENV,
    });
  } catch (err) {
    return res.status(400).json({
      code: 400,
      status: failed,
      msg: err.message,
    });
  }
});

router.use("/api", api); // rest api routes

module.exports = router;
