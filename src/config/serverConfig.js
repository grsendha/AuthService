const dotenv = require('dotenv')
const path = require('path');

dotenv.config({ path: path.resolve('../.env') });

module.exports = {
  PORT: process.env.PORT
}