'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const DEFAULT_PORT = 3000;
const DEFAULT_HOST = 'localhost';
const PORT = 'port';
const HOST = 'host';

try {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  app.set(PORT, process.env.PORT || DEFAULT_PORT);
  app.set(HOST, process.env.HOST || DEFAULT_HOST);

  app.use((err, res, next) => {

    // if (err)  return res.status(500).send({ message: 'An error has occurred. Please chek if the data was entered correctly.' })

    res.header("Acces-Control-Allow-Origin", "*");
    res.header(
      "Acces-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Allow-Request-Method"
    );
    res.header("Acces-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    next();



  })

  app.use('/api', userRoutes, bookRoutes);
  const LISTENEABLE_PORT = app.get(PORT);
  const LISTENEABLE_HOST = app.get(HOST);

  module.exports = {
    app,
    LISTENEABLE_HOST,
    LISTENEABLE_PORT
  }


} catch (e) {
  if (e instanceof TypeError) {
    return res.status(500).send({ message: 'An error has occurred. Please check if the data was entered correctly.' })
  }
}