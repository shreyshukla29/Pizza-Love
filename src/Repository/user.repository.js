const User = require("../schema/user.schema");


class UserRepository {
  async findUser(parameter) {
    try {
      const response = await User.findOne({ ...parameter });

      return response;
    } catch (error) {
      console.log("error in findUser");
    }
  }

  async createUser(userDetails) {
    try {
      const response = await User.create({ ...userDetails });
      return response;
    } catch (error) {}
  }
}

module.exports = UserRepository;
