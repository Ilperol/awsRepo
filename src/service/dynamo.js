const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

class DynamoDBService {
  static async getAllTodos() {
    const params = {
      TableName: process.env.TODOS_TABLE,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': 'todo',
      },
    };
    const result = await dynamoDb.query(params).promise();
    return result.Items;
  }

  static async createTodo(todo) {
    const params = {
      TableName: process.env.TODOS_TABLE,
      Item: todo,
      ConditionExpression: 'attribute_not_exists(sk)',
    };
    await dynamoDb.put(params).promise();
  }

  static async updateTodo(id, updatedFields) {
    const params = {
      TableName: process.env.TODOS_TABLE,
      Key: { pk: 'todo', sk: id },
      UpdateExpression: 'set #name = :name, updatedAt = :updatedAt',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: {
        ':name': updatedFields.name,
        ':updatedAt': updatedFields.updatedAt,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDb.update(params).promise();
    return result.Attributes;
  }

  static async deleteTodo(id) {
    const params = {
      TableName: process.env.TODOS_TABLE,
      Key: { pk: 'todo', sk: id },
    };
    await dynamoDb.delete(params).promise();
  }
}

module.exports = DynamoDBService;
