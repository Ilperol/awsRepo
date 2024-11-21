class ValidationService {
    static validateTodoInput(input) {
      const { name } = input;
      if (!name || typeof name !== 'string' || /[0-9]/.test(name)) {
        throw new Error('Invalid name: Name must be a string with no numbers.');
      }
    }
  }
  
  module.exports = ValidationService;
  