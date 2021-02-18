'use strict';
const { connectToDatabase, queryDatabase } = require("../utils/databaseUtils")

module.exports.members = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('event: ', event);
    console.log(process.env.MONGODB_URI)
    connectToDatabase("mongodb://admin:admin@localhost:27017/serverless_test")
      .then(db => queryDatabase(db))
      .then(result => {
        console.log('=> returning result: ', result);
        callback(null, result);
      })
      .catch(err => {
        console.log('=> an error occurred: ', err);
        callback(err);
      });
};
