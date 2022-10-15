// import './style.css'
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";

const domInpTodoTitle = document.getElementById("inpTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick);

class TodoVO {
  constructor(id, title, date = new Date()) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.isCompleted = false;
  }
}

const listOfTodos = [];

// domInpTodoTitle.value = "Todo text";

function onBtnCreateTodoClick(e) {
  // console.log("> domBtnCreateTodo -> handle(click)", e);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log(
  //   "> domBtnCreateTodo -> todoInputTitleValue:",
  //   todoTitleValueFromDomInput
  // );

  const canCreateToDo = validateToDoInputTitleValue(todoTitleValueFromDomInput);

  if (validateToDoInputTitleValue(todoTitleValueFromDomInput)) {
    listOfTodos.push(createTodoVO(todoTitleValueFromDomInput));
    renderTodoInContainer(listOfTodos, domListOfTodos);
  }
}

function validateToDoInputTitleValue(value) {
  const isInputValueString = typeof value === "string";
  const isInputValueNotNumber = isNaN(parseInt(value));

  const result = isInputValueString && isInputValueNotNumber && value.length > 0;

  return result;
}

function createTodoVO(title) {
  const todoId = Date.now().toString();
  // const todoVO = new TodoVO(todoId, title);
  return new TodoVO(todoId, title);
}

function renderTodoInContainer(list, container) {
  let output = "";
  for (let index in list) {
    output += `<li>${listOfTodos[index].title}</li>`;
  }
  domListOfTodos.innerHTML = output;
}
