const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = ({ _id, email }) => {
  try {
    return jwt.sign(
      { userId, ...spAdminExist },
      JWT_SECRET,
      86400 // Time in seconds 1 day for easy code format now
    );
  } catch (err) {
    console.error("Error in generateAccessToken : ", err);
    return null;
  }
};
