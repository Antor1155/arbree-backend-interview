const { addUser, getUser } = require("../../helpers/user");
const generateJwtToken = require("../../utils/generateJwtToken");
const generateUserPassword = require("../../utils/generateUserPassword");

const userRegisterController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await getUser({ email });
    if (!userExist) {
      throw new Error("user with same email already present");
    }

    const hashedPassword = await generateUserPassword(password);

    const newUser = await addUser({ email, hash: hashedPassword });

    const jwtToken = generateJwtToken({
      _id: newUser?._id,
      email: newUser?.email,
    });

    return res.status(200).json({
      jwtToken,
      email: newUser?.email,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error.message,
    });
  }
};

module.exports = userRegisterController;
