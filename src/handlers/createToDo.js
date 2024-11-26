const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require('uuid');
const ValidationService = require('../services/ValidationService');
const Todo = require('../models/todo');

let options = {};
if (process.env.IS_OFFLINE === 'true') {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}
const client = new DynamoDBClient(options);
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing request body" }) };
    }

    const body = JSON.parse(event.body);

    try {
      ValidationService.validateTodoInput(body);
    } catch (error) {
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    const todo = new Todo({
      sk: uuidv4(),
      task: body.task,
      completed: body.completed,
    });

    const params = { TableName: process.env.TODOS_TABLE, Item: todo };

    await dynamoDb.send(new PutCommand(params));

    return { statusCode: 201, body: JSON.stringify({ message: "Todo created successfully", id: todo.sk }) };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not create todo" }) };
  }
};
