const { findEvent } = require("../../helpers/event");

const getEvent = async (req, res) => {
  try {
    const result = await findEvent();

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      code: 400,
      msg: err.msg,
    });
  }
};

module.exports = getEvent;
