const UserRepository = require('../repositories/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

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

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
      return result;
    } catch (error) {

      console.log("Error occurred in createToken method:", error);
      throw new Error("Error in createToken method");
    }
  }

  verifyToken(token) {
    try {
      const result = jwt.verify(token, JWT_KEY);
      return result;
    } catch (error) {
      console.log("Error occurred in verifyToken method:", error);
      throw new Error("Error in verifyToken method");
    }
  }

  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Error occurred in checkPassword method:", error);
      throw new Error("Error in checkPassword method");
    }
  }
}

module.exports = UserService;