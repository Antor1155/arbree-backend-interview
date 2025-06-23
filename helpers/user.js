const User = require("../models/User");

module.exports = {
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
