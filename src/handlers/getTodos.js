const DynamoDBService = require('../services/DynamoDBService');

module.exports.handler = async () => {
  try {
    const todos = await DynamoDBService.getAllTodos();

    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch todos' }),
    };
  }
};
