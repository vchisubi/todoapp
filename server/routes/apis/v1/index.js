'use strict';

const express = require('express');
const todolistController = require('../../../controllers/apis/todos/index');

let router = express.Router();

router.use('/api/todos', todolistController);

module.exports = router;