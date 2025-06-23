const User = require("../models/User");

module.exports = {
  addUser: async (obj = {}) => {
    try {
      let newUser = await new User(obj).save();

      return newUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getUser: async (filter, projection = null, options = null) => {
    try {
      let found = await User.findOne(filter, projection, options).lean();
      return found;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
