// класс со статической функцией в которой проверяем чекнут или нет и возвращаем <li> c checked

class TodoView {
    static createSimpleViewFromVO (index, vo) {
        const checked = vo.isCompleted ? 'checked' : ''; // если чекбокс чекнут -  мы выполняем checked
        return `<li><input type="checkbox" id="${index}"${checked}>${vo.title}</li>` // возвращаем li с индексом, чекбоксом и заголовком
    }
}

export  default TodoView;