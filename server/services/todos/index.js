'use strict'

const db = require('../../database/db')
const collection = 'todolist';

let currId = 1;

const getList = (req,res) => {
  db.getDB().collection(collection).find({}).toArray((err,documents) => {
		if(err)
			console.log(err);
		else{
			res.json(documents);
		}
	});
};

const getTask = (req,res) => {
  let targetId = parseInt(req.params.id);
  db.getDB().collection(collection).find({"id" : targetId}).toArray((err,document) => {
    if(err)
        console.log(err);
    else
        res.json(document);
  });
};

const createTask = (req,res) => {
  const userInput = req.body;
  const task = userInput.title;

  let response = {'id':currId, 'title':task, 'completed':false};

  db.getDB().collection(collection).insertOne(response, (err,result) => {
		if(err)
			console.log(err);
		else{
      currId++;
      res.json(response);
		}
	});
};

const updateTask = (req,res) => {
  let targetId = parseInt(req.params.id);
  const userInput = req.body;
  const toggle = userInput.completed;
  db.getDB().collection(collection).findOneAndUpdate({"id" : targetId},{$set : {"completed" : toggle}},{returnOriginal : false},(err,result) => {
    if(err)
        console.log(err);
    else
        res.json(result);
  });
};

const deleteAllTasks = (req,res) => {
  db.getDB().collection(collection).deleteMany({}).then(result => {
    res.send(result);
  });
  currId = 1;
};

const deleteTask = (req,res) => {
  console.log('Deleting task with id: ' + req.params.id);
  let targetId = parseInt(req.params.id);
  db.getDB().collection(collection).findOneAndDelete({"id" : targetId}, (err,result) => {
    if(err)
      console.log(err);
    else
      res.json(result);
  });
};

module.exports = {
  getList: getList,
  getTask: getTask,
	createTask: createTask,
	updateTask: updateTask,
  delAllTasks: deleteAllTasks,
  deleteTask: deleteTask,
};