const UserRepository = require('../repositories/user-repository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {

      const user = await this.userRepository.create(data);

      return user;
    } catch (error) {
      console.log("something went wrong", error);
    }
  }

  async destroyUser(userId) {
    try {
      const result = await this.userRepository.destroy(userId);
      return result;
    } catch (error) {
      console.log("something went wrong", error);
    }
  }
}

module.exports = UserService;