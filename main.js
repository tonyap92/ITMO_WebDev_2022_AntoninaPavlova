// import './style.css'
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";
import TodoVO from "./src/model/vos/TodoVO.js";

const domInpTodoTitle = document.getElementById("inpTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick);

const LOCAL_LIST_OF_TODOS = "listOfTodos";

const localListOfTodos = localStorage.getItem(LOCAL_LIST_OF_TODOS);
const listOfTodos = localListOfTodos != null ? JSON.parse(localListOfTodos) : [];

console.log(">Initial value -> listOfTodos", listOfTodos);

renderTodoInContainer(listOfTodos, domListOfTodos); //рендеринг

// domInpTodoTitle.value = "Todo text";

function onBtnCreateTodoClick(e) {
  // console.log("> domBtnCreateTodo -> handle(click)", e);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log(
  //   "> domBtnCreateTodo -> todoInputTitleValue:",
  //   todoTitleValueFromDomInput
  // );

  // const canCreateToDo = validateToDoInputTitleValue(todoTitleValueFromDomInput);

  if (validateToDoInputTitleValue(todoTitleValueFromDomInput)) {
    listOfTodos.push(createTodoVO(todoTitleValueFromDomInput)); //добавили
    localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos)); //сохранили
    renderTodoInContainer(listOfTodos, domListOfTodos); //рендеринг
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
