'use strict'

const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
//const dbname = 'fakeDb';
const dbname = 'heroku_f6zth6wm'
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//Connect to mLab database on the cloud
//const uri = 'mongodb://heroku_f6zth6wm:9646h2984hr0ujqc4ah28417jf@ds161315.mlab.com:61315/heroku_f6zth6wm'

const state = {
  db: null
};

const connect = (cb) => {
  if (state.db) {
    cb();
  }
  else {
    MongoClient.connect(url, mongoOptions, (err, client) => {
      if (err) {
        cb(err);
      }
      else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
}

// const getPrimaryKey = (_id) => {
// 	return ObjectID(_id);
// }

const getDB = () => {
  return state.db;
}

module.exports = {
  getDB,
  connect
  // getPrimaryKey
};