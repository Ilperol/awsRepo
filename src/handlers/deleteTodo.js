const DynamoDBService = require('../services/DynamoDBService');

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    await DynamoDBService.deleteTodo(id);

    return {
      statusCode: 204,
      body: null,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
