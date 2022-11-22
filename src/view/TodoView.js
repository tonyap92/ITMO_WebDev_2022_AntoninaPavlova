// класс со статической функцией в которой проверяем чекнут или нет и возвращаем <li> c checked

class TodoView {
  static TODO_VIEW_ITEM = "todoitem";
  static TODO_VIEW_ITEM_DELETE = "delete-button";

  static isDomElementMatch(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM;
  }

  static isDomElementMatchDeleteButton(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM_DELETE;
  }

  static getTodoIdFromDeleteButton(domDeleteButton) {
    return domDeleteButton.parentNode.id;
  }

  static createSimpleViewFromVO(index, vo) {
    const checked = vo.isCompleted ? "checked" : ""; // если чекбокс чекнут -  мы выполняем checked
    return `<li data-type="${TodoView.TODO_VIEW_ITEM}" id="${vo.id}">
            <input type="checkbox" 
            data-test="todo-checker"
            id="${index}"${checked}>${vo.title}
           <button data-type="${TodoView.TODO_VIEW_ITEM_DELETE}">x</button>
            </li>`; // возвращаем li с индексом, чекбоксом и заголовком
  }
}

export default TodoView;
