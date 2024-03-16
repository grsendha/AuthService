const { User } = require('../models/index');

class UserRepository {
  async create(data) {
    try {

      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong", error);
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({ where: { id: userId } });
      return true;
    } catch (error) {
      console.log("something went wrong", error);
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        atttributes: ['email', 'id']
      });
      return user;
    } catch (error) {

    }
  }
}
module.exports = UserRepository;