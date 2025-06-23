const { createEvent } = require("../../helpers/event");

const addEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const banner = req.file;
    const user = req.user;

    const result = await createEvent({
      title,
      description,
      banner: banner?.path,
      userEmail: user?.email,
      userId: user?._id,
    });

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      code: 400,
      msg: err.msg,
    });
  }
};

module.exports = addEvent;
