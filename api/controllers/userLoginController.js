const argon2 = require("argon2");

const { getUser } = require("../../helpers/user");
const generateJwtToken = require("../../utils/generateJwtToken");
const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await getUser({ email });
    if (!userExist) {
      throw new Error("user not present");
    }

    let passwordMatch = (await argon2.verify(userExist?.hash, password))
      ? true
      : false;

    if (!passwordMatch) {
      throw new Error("invalid password");
    }

    const jwtToken = generateJwtToken({
      email: userExist?.email,
    });

    return res.status(200).json({
      jwtToken,
      email: userExist?.email,
    });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error.message,
    });
  }
};

module.exports = userLoginController;
