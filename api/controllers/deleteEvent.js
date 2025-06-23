const { deleteEvent, getEvent } = require("../../helpers/event");

const deleteEventController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const event = await getEvent({ _id: id });
    console.log({ user, event });
    if (user?.email === event.userEmail) {
      const deleted = await deleteEvent({ _id: id });
      if (!deleted) throw new Error("failed to delete");
      return res.status(200).json(deleted);
    }
    throw new Error("failed to delete");
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      code: 400,
      msg: err.msg,
    });
  }
};

module.exports = deleteEventController;
