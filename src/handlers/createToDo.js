const DynamoDBService = require('../services/DynamoDBService');
const ValidationService = require('../services/ValidationService');
const { v4: uuidv4 } = require('uuid');

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    ValidationService.validateTodoInput(data);

    const todo = {
      pk: 'todo', // Partition Key
      sk: uuidv4(), // Sort Key (Unique ID)
      name: data.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await DynamoDBService.createTodo(todo);

    return {
      statusCode: 201,
      body: JSON.stringify(todo),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
