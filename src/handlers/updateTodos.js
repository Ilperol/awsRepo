const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

let options = {};
if (process.env.IS_OFFLINE === 'true') {
  options = { region: 'localhost', endpoint: 'http://localhost:8000' };
}
const client = new DynamoDBClient(options);
const dynamoDb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id || !event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid input" }) };
    }

    const body = JSON.parse(event.body);

    const params = {
      TableName: process.env.TODOS_TABLE,
      Key: { pk: "todo", sk: id },
      UpdateExpression: "set #task = :task, #completed = :completed",
      ExpressionAttributeNames: {
        "#task": "task",
        "#completed": "completed",
      },
      ExpressionAttributeValues: {
        ":task": body.task,
        ":completed": body.completed,
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDb.send(new UpdateCommand(params));

    return { statusCode: 200, body: JSON.stringify(result.Attributes) };
  } catch (error) {
    console.error("Error updating todo:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not update todo" }) };
  }
};
