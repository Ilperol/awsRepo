const AWS = require('aws-sdk');

const isOffline = process.env.IS_OFFLINE === 'true';

const dynamoDB = isOffline
  ? new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    })
  : new AWS.DynamoDB.DocumentClient();

console.log(`DynamoDB is running offline: ${isOffline}`);

module.exports = dynamoDB;
