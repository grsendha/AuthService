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
      if (error.name === 'SequelizeValidationError') {
        throw error;
      }
      console.log("something went wrong", error);
    }
  }

  async signIn(email, plainPassword) {
    try {

      // Step 1: Retrieve user by email from the database
      const user = await this.userRepository.getByEmail(email);

      // Step 2: Check if the password matches the user's password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log('password doesnt match');
        throw {
          message: 'password doesnt match'
        }
      }

      // Step 3: Create a new JWT token for the user
      const newJWT = this.createToken({
        email: user.email,
        id: user.id
      });
      return newJWT;
    } catch (error) {
      console.log("Error occurred in signIn method:", error);
      throw new Error("Error in signIn method");
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

  async isAuthenticated(token) {
    const response = this.verifyToken(token);
    if (!response) {
      throw {
        message: 'token verification failed'
      }
    }
    const user = this.userRepository.getById(response.id);
    if (!user) {
      throw {
        message: 'user not found'
      }
    }
    return user.id;
  }

  isAdmin(userId) {
    return this.userRepository.isAdmin(userId);
  }
}

module.exports = UserService;