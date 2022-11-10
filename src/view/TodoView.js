// класс со статической функцией в которой проверяем чекнут или нет и возвращаем <li> c checked

class TodoView {
  static TODO_VIEW_ITEM = "todoitem";

  static isDomElementMatch(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM;
  }

  static createSimpleViewFromVO(index, vo) {
    const checked = vo.isCompleted ? "checked" : ""; // если чекбокс чекнут -  мы выполняем checked
    return `<li data-type="${TodoView.TODO_VIEW_ITEM}" id="${vo.id}">
            <input type="checkbox" 
            data-test="todo-checker"
            id="${index}"${checked}>${vo.title}
            </li>`; // возвращаем li с индексом, чекбоксом и заголовком
  }
}

export default TodoView;
