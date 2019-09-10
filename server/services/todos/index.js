'use strict'

const db = require('../../database/db')
const collection = 'todolist';

const getList = async () => {
  return new Promise((resolve, reject) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
      if (err)
        reject(err);
      else {
        resolve(documents || {});
      }
    });
  });
};

const getTask = (taskId) => {
  return new Promise((resolve, reject) => {
    db.getDB().collection(collection).find({ "id": taskId }).toArray((err, document) => {
      if (err)
        reject(err);
      else
        resolve(document || {});
    });
  });
};

const createTask = (task) => {
  return new Promise((resolve, reject) => {
    db.getDB().collection(collection).insertOne(task, (err, result) => {
      if (err)
        reject(err);
      else {
        //currId++;
        resolve(result || {});
      }
    });
  });
};

const updateTask = async (taskId, toggle) => {
  return new Promise((resolve, reject) => {
    db.getDB().collection(collection).findOneAndUpdate({ "id": taskId }, { $set: { "completed": toggle } }, { returnOriginal: false }, (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result || {});
    });
  });
};

const deleteAllTasks = async () => {
  console.log('Deleting all tasks');

  return new Promise((resolve, reject) => {
    db.getDB().collection(collection).deleteMany({}).then(result => {
      resolve(result || {});
    });
  });
};

const deleteTask = async (taskId) => {
  console.log('Deleting task with id: ' + taskId);

  return new Promise((resolve, reject) => {
    db.getDB().collection(collection).findOneAndDelete({ "id": taskId }, (err, result) => {
      if(err)
        reject(err);
      else
        resolve(result || {});
    });
  });
};

module.exports = {
  getList: getList,
  getTask: getTask,
  createTask: createTask,
  updateTask: updateTask,
  deleteAllTasks: deleteAllTasks,
  deleteTask: deleteTask,
};