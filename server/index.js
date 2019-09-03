'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function () {

  let server = express(),
    create,
    start;

  create = function(dir) {
    let routes = require('./routes');

    //Allows server to use all the todoapp files
    server.use('/client', express.static('client'));

    //Displays the index.html in browser
    server.get('/', (req, res, next) => {
      res.sendFile(dir + '/index.html');
    });

    //Returns middleware that parses json
    server.use(bodyParser.json());
    server.use(cors());

    routes.init(server);
  };

  start = function() {
    const port = process.env.PORT || 4001;
    server.listen(port, () => {console.log(`Listening on port ${port}...`)});
  };

  return {
    create: create,
    start: start
  };
};
