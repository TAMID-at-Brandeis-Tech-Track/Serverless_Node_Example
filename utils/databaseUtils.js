"use strict";
const MongoClient = require('mongodb').MongoClient;
let cachedDb = null;
function connectToDatabase (uri) {
  console.log('=> connect to database');
  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }
  return MongoClient.connect(uri)
    .then(db => {
      cachedDb = db.db("serverless_test");
      return cachedDb;
    });
}
function queryDatabase (db) {
  console.log('=> query database');
  return db.collection('members').find({}).toArray()
    .then((result) => { return { statusCode: 200, body: 'success', result}; })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

module.exports = {
    queryDatabase, connectToDatabase
}
