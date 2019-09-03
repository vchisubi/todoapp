'use strict'

const express = require('express');
const controller = require('../../services/db');

let server = express.Router();

server.get('/', (req, res, next) => {
  let response = controller.getList();

  res.send(response);
});

server.get('/:id', (req, res, next) => {
  let response = controller.getTask(req.params.id);

  res.send(response);
});

server.post('/', (req, res, next) =>{
  let response = controller.createTask(req.body);

  res.send(response);
});

server.patch('/:id', (req, res, next) =>{
  let response = controller.updateTask(req.body);

  res.send(response);
});

server.delete('/', (req, res, next) =>{

  res.send(controller.delAllTasks());
});

server.delete('/:id', (req, res, next) =>{
    console.log('Delete task with id: ' + req.params.id);
  let response = controller.deleteTask(req.params.id);

  res.send(response);
});

module.exports = server;