'use strict'

const express = require('express');
const todoService = require('../../../services/todos');

let router = express.Router();

let currId = 1;

router.get('/', (req,res) => {
  todoService.getList().then(result => {
    res.json(result);
  });
});

router.get('/:id', (req,res) => {
  let taskId = parseInt(req.params.id);
  todoService.getTask(taskId).then(result => {
    res.json(result);
  });
});

router.post('', (req,res) => {
  const userInput = req.body;
  const task = userInput.title;
  let taskObject = {'id':currId, 'title':task, 'completed':false};
  todoService.createTask(taskObject).then(result => {
    currId++;
    res.send(result);
  });;
});

router.patch('/:id', (req,res) => {
  let taskId = parseInt(req.params.id);
  let userInput = req.body;
  const toggle = userInput.completed;
  todoService.updateTask(taskId, toggle).then(result => {
    res.json(result);
  });
});

router.delete('/', (req,res) => {
  todoService.deleteAllTasks().then(result => {
    currId = 1;
    res.json(result);
  });
});

router.delete('/:id', (req,res) => {
  let taskId = parseInt(req.params.id);
  todoService.deleteTask(taskId).then(result => {
    res.json(result);
  });
});

module.exports = router;