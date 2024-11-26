const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const Todo = require('../models/todo');

let options = {};
if (process.env.IS_OFFLINE === 'true') {
  options = { region: 'localhost', endpoint: 'http://localhost:8000' };
}
const client = new DynamoDBClient(options);
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.handler = async () => {
  try {
    const params = {
      TableName: process.env.TODOS_TABLE,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": "todo" },
    };

    const result = await dynamoDb.send(new QueryCommand(params));

    const todos = result.Items.map(Todo.fromDbItem);

    return { statusCode: 200, body: JSON.stringify(todos) };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not fetch todos" }) };
  }
};
