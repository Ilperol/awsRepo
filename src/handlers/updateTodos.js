const DynamoDBService = require('../services/DynamoDBService');
const ValidationService = require('../services/ValidationService');

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);
    ValidationService.validateTodoInput(data);

    const updatedTodo = {
      name: data.name,
      updatedAt: new Date().toISOString(),
    };

    const result = await DynamoDBService.updateTodo(id, updatedTodo);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
