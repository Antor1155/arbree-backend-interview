const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = ({ email }) => {
  try {
    return jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: 86400 } // 1 day in seconds
    );
  } catch (err) {
    console.error("Error in generateAccessToken:", err);
    return null;
  }
};
