'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./db.js');

let server = express();

server.use(bodyParser.json());
server.use(cors());

//Allows server to use all the todoapp files
server.use('/src', express.static('src'));

//Displays the index.html in browser
server.get('/', (req, res, next) => {

  res.sendFile(__dirname + '/index.html');
});

server.get('/api/todos', (req, res, next) => {
  let response = controller.getList();

  res.send(response);
});

server.get('/api/todos/:id', (req, res, next) => {
  let response = controller.getTask(req.params.id);

  res.send(response);
});

server.post('/api/todos', (req, res, next) =>{
  let response = controller.createTask(req.body);

  res.send(response);
});

server.patch('/api/todos/:id', (req, res, next) =>{
  let response = controller.updateTask(req.body);

  res.send(response);
});

server.delete('/api/todos', (req, res, next) =>{

  res.send(controller.delAllTasks());
});

server.delete('/api/todos/:id', (req, res, next) =>{
    console.log('Delete task with id: ' + req.params.id);
  let response = controller.deleteTask(req.params.id);

  res.send(response);
});

const port = process.env.PORT || 4001;
server.listen(port, () => console.log(`Listening on port ${port}...`));