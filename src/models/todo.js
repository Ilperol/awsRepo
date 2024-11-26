class Todo {
  constructor({ pk = "todo", sk, task = "Untitled task", completed = false }) {
    this.pk = pk;
    this.sk = sk;
    this.task = task;
    this.completed = completed;
  }

  static fromDbItem(item) {
    return new Todo({
      pk: item.pk,
      sk: item.sk,
      task: item.task,
      completed: item.completed,
    });
  }
}

module.exports = Todo;
