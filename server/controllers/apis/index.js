'use strict'

const express = require('express');
const controller = require('../../services/db');
const collection = 'todolist';

let server = express.Router();

let currId = 1;

server.get('/',(req,res)=>{
  controller.getDB().collection(collection).find({}).toArray((err,documents) => {
		if(err)
			console.log(err);
		else{
			res.json(documents);
		}
	});
});

server.get('/:id', (req, res)=>{
  let targetId = parseInt(req.params.id);
  controller.getDB().collection(collection).find({"id" : targetId}).toArray((err,document) => {
    if(err)
        console.log(err);
    else
        res.json(document);
  });
});

server.post('/', (req, res) => {
  const userInput = req.body;
  const task = userInput.title;

  let response = {'id':currId, 'title':task, 'completed':false};

  controller.getDB().collection(collection).insertOne(response, (err,result)=>{
		if(err)
			console.log(err);
		else{
      currId++;
      res.json(response);
			//res.json({result : result, document : result.ops[0], msg : "Successfully inserted Todo!!!"});
		}
	});
});

server.patch('/:id', (req, res) => {
  let targetId = parseInt(req.params.id);
  const userInput = req.body;
  const toggle = userInput.completed;
  controller.getDB().collection(collection).findOneAndUpdate({"id" : targetId},{$set : {"completed" : toggle}},{returnOriginal : false},(err,result)=>{
    if(err)
        console.log(err);
    else
        res.json(result);
  });
});

server.delete('/', (req, res) => {
  //let response = controller.getDB().collection(collection).find({}).toArray();
  controller.getDB().collection(collection).deleteMany({}).then(result => {res.send(result);});
  currId = 1;
});

server.delete('/:id', (req, res) => {
  console.log('Deleting task with id: ' + req.params.id);
  let targetId = parseInt(req.params.id);
  controller.getDB().collection(collection).findOneAndDelete({"id" : targetId},(err,result)=>{
    if(err)
      console.log(err);
    else
      res.json(result);
  });
});

module.exports = server;