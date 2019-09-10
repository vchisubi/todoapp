'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./database/db');

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
      res.sendFile(dir + '/client/index.html');
    });

    //Returns middleware that parses json
    server.use(bodyParser.json());

    routes.init(server);
  };

  start = function() {
    const port = process.env.PORT || 4001;

    //Connect to the DB
    controller.connect((err) => {
      if(err){
        console.log('Unable to connect to the database!');
        console.log(err);
        process.exit(1);
      }
      else{
        server.listen(port, () => {console.log(`Connection successful: Listening on port ${port}`)});
      }
    });

  };

  return {
    create: create,
    start: start
  };
};
