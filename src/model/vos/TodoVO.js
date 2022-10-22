

class TodoVO {
  static createFromTitle(title) {
    const todoId = Date.now().toString(); // Создаем константу todoId, которой присвайваем метку в мс, возвращенную в строку.
    // const todoVO = new TodoVO(todoId, title);
    return new TodoVO(todoId, title); // создаем новый чертеж
  }

  // Cоздаем "чертёж" - экземпляр объекта задачи, который имеет id, title, date и завершенные свойства.
  constructor(id, title, date = new Date()) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.isCompleted = false;
  }
}

export default TodoVO;
