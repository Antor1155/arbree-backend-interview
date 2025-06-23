const userLoginController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: failed,
      msg: error.message,
    });
  }
};

module.exports = userLoginController;
