'use strict'

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = 'fakeDb';
const url = 'mongodb://localhost:27017';
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology : true};

const state = {
		db : null
};

const connect = (cb) => {
	if(state.db){
		cb();
	}
	else{
		MongoClient.connect('mongodb://localhost:27017/fakeDb', mongoOptions, (err,client) => {
			if(err){
				cb(err);
			}
			else{
				state.db = client.db(dbname);
				cb();
			}
		});
	}
}

const getPrimaryKey = (_id) => {
	return ObjectID(_id);
}

const getDB = () => {
	state.db;
}

let fakeDb = [
  {'id': 0, 'title': 'Enter a task!', 'completed': false}
];

var currIndex = 1;

const createTask = (task) => {
	let index = currIndex;
	let title = task.title;
	let response = {'id': index, 'title': title, 'completed': false};
	fakeDb.push(response);
	currIndex++;

	return response;
};

const updateTask = (param) => {
	let taskId = param.id;
	let toggle = param.completed;
	let taskIndex = fakeDb.map((task) => {return task.id;}).indexOf(taskId);
	fakeDb[taskIndex].completed = toggle;
	let response = fakeDb[taskIndex];

	return response;
};

const deleteTask = (taskId) => {
	let taskIndex = fakeDb.map((task) => {return task.id;}).indexOf(parseInt(taskId));
	let response = fakeDb[taskIndex];

	fakeDb.splice(taskIndex, 1);

	return response;
};

const delAllTasks = () => {
	let response = fakeDb;
	fakeDb = [];
	currIndex = 0;

	return response;
};

const getTask = (taskId) => {
	let taskIndex = fakeDb.map((task) => {return task.id;}).indexOf(taskId);
	let response = fakeDb[taskIndex];

	return response;
}

const getList = () => {
	let response = fakeDb;

	return response;
}

module.exports = {
	createTask,
	updateTask,
	deleteTask,
	delAllTasks,
	getTask,
	getList,
	getDB,
	connect,
	getPrimaryKey
};