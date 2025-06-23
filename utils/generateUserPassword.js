const argon2 = require("argon2");

const generateUserPassword = async (plainPassword) => {
  // uses argon2 to hash the password
  try {
    const hash = await argon2.hash(plainPassword);
    return hash;
  } catch (error) {
    console.error("Error in generateUserPassword", error);
    return null;
  }
};

module.exports = generateUserPassword;
