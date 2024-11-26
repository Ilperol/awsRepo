class ValidationService {
  static validateTodoInput(input) {
    const { task } = input;
    if (!task || typeof task !== 'string' || /[0-9]/.test(task)) {
      throw new Error('Invalid task: Task must be a string with no numbers.');
    }
  }
}

module.exports = ValidationService;
