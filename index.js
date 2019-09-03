'use strict';

const server = require('./server')();
const dir = __dirname;

server.create(dir);
server.start();