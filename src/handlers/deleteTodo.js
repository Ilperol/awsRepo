const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

let options = {};
if (process.env.IS_OFFLINE === 'true') {
  options = { region: 'localhost', endpoint: 'http://localhost:8000' };
}
const client = new DynamoDBClient(options);
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing todo ID" }) };
    }

    const params = { TableName: process.env.TODOS_TABLE, Key: { pk: "todo", sk: id } };

    await dynamoDb.send(new DeleteCommand(params));

    return { statusCode: 200, body: JSON.stringify({ message: "Todo deleted successfully" }) };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not delete todo" }) };
  }
};
