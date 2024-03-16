const express = require('express');
const { PORT } = require('./config/serverConfig')
const app = express();
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

console.log(PORT, process.env.PORT)
const prepareAndStartServer = () => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/api', apiRoutes);
  app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
  })
}

prepareAndStartServer()