const { deleteEvent, getEvent } = require("../../helpers/event");

const deleteEventController = async (req, res) => {
  try {
    const { title } = req.query;

    // here will come the search query

    console.log({ title });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      code: 400,
      msg: err.msg,
    });
  }
};

module.exports = deleteEventController;
