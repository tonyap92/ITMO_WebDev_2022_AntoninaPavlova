// класс со статической функцией в которой проверяем чекнут или нет и возвращаем <li> c checked

class TodoView {
  static TODO_VIEW_ITEM = "todoitem";
  static TODO_VIEW_ITEM_DELETE = "tododelete";

  static isDomElementMatch(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM;
  }

  static isDomElementDeleteButton(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM_DELETE;
  }

  static getTodoIdFromDeleteButton(domDeleteButton) {
    return domDeleteButton.parentNode.id;
  }

  static createSimpleViewFromVO(index, vo) {
    const checked = vo.isCompleted ? "checked" : ""; // если чекбокс чекнут -  мы выполняем checked
    return `
        <li class="todo-item" style="user-select: none; width: 100%; position: relative; margin: 4px 0" data-type="${TodoView.TODO_VIEW_ITEM}" id="${vo.id}">
            <input type="checkbox" 
            data-test="todo-checker"
            id="${index}"${checked}>${vo.title}
           <button 
           class="delete-button" 
           style="position: absolute; right: 0; top: 0" 
           data-type="${TodoView.TODO_VIEW_ITEM_DELETE}"
           >x</button>
            </li>
        `; // возвращаем li с индексом, чекбоксом и заголовком
  }
}

export default TodoView;
