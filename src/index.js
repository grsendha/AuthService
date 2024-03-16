const express = require('express');
const { PORT } = require('./config/serverConfig')
const app = express();


console.log(PORT, process.env.PORT)
const prepareAndStartServer = () => {
  app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
  })
}

prepareAndStartServer()