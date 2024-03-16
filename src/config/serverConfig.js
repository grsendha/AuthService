const dotenv = require('dotenv')
const path = require('path');
const bcrypt = require('bcrypt')

dotenv.config({ path: path.resolve('../.env') });

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),
}