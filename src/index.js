const express = require('express');
const { PORT } = require('./config/serverConfig')
const app = express();
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const UserService = require('./services/user-service');
const db = require('./models/index');
const { User, Role } = require('./models/index')

console.log(PORT, process.env.PORT)
const prepareAndStartServer = () => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/api', apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server Started at http://localhost:${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    // const u1 = await User.findByPk(4);
    // const r1 = await Role.findByPk(1);


    // const service = new UserService();
    // const newToken = service.createToken({ email: "hello@gmail.com", id: 1 });
    // console.log('token is ', newToken);

    // const token = service.verifyToken(newToken);
    // console.log('decrypted ', token);
  })
}

prepareAndStartServer()