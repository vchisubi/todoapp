'use strict'

const express = require('express');
const todoService = require('../../../services/todos');

let router = express.Router();

router.get('/', todoService.getList);

router.get('/:id', todoService.getTask);

router.post('/', todoService.createTask);

router.patch('/:id', todoService.updateTask);

router.delete('/', todoService.delAllTasks);

router.delete('/:id', todoService.deleteTask);

module.exports = router;