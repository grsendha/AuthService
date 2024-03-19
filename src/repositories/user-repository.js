const ValidationError = require('../models/index');
const { User, Role } = require('../models/index');

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        let validationError = new ValidationError(error);
        console.log(validationError);
      }
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

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({ where: { email: userEmail } });
      return user;
    } catch (error) {
      console.log("something went wrong", error);
    }
  }
  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: { name: 'ADMIN' }
      });
      console.log(adminRole, user)
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("something went wrong", error);
    }
  }
}
module.exports = UserRepository;