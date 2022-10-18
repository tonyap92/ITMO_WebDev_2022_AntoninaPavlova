// import './style.css'
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";
import TodoVO from "./src/model/vos/TodoVO.js";

const domInpTodoTitle = document.getElementById("inpTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick);
domInpTodoTitle.addEventListener("keyup", onInpTodoTitleKeyup);

const LOCAL_LIST_OF_TODOS = "listOfTodos";
const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log(">Initial value -> listOfTodos", listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos); //рендеринг
disabledButtonWhenTextInvalid(domBtnCreateTodo, domInpTodoTitle.value, isStringNotNumberAndNotEmpty);

// domInpTodoTitle.value = "Todo text";

function onBtnCreateTodoClick(e) {
  // console.log("> domBtnCreateTodo -> handle(click)", e);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log(
  //   "> domBtnCreateTodo -> todoInputTitleValue:",
  //   todoTitleValueFromDomInput
  // );

  // const canCreateToDo = validateToDoInputTitleValue(todoTitleValueFromDomInput);

  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    listOfTodos.push(TodoVO.createFromTitle(todoTitleValueFromDomInput)); //добавили
    localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos)); //сохранили
    renderTodoListInContainer(listOfTodos, domListOfTodos); //рендеринг
  }
}

function onInpTodoTitleKeyup(event) {
  console.log("> onInpTodoTitleKeyup:", event);
  const inputValue = event.currentTarget.value;
  console.log("> onInpTodoTitleKeyup:", inputValue);

  disabledButtonWhenTextInvalid(domBtnCreateTodo, inputValue, isStringNotNumberAndNotEmpty);
}

// Функция отвечает за вывод только строки, не чисел и чтоб input не был пустым
function isStringNotNumberAndNotEmpty(value) {
  const isValueString = typeof value === "string"; // проверка на строку
  const isValueNotNumber = isNaN(parseInt(value)); // проверка на не число

  const result = isValueString && isValueNotNumber && value.length > 0;

  return result;
}

function localStorageListOf(key) {
  const value = localStorage.getItem(key);
  console.log();

  if (value == null) return [];

  const parsedValue = JSON.parse(value);
  const isParsedValueArray = Array.isArray(parsedValue);

  return isParsedValueArray ? parsedValue : [];
}

function disabledButtonWhenTextInvalid(button, text, validateTextFunction) {
  if (!validateTextFunction) throw new Error("Validate method must be defined");

  if (validateTextFunction(text)) {
    button.disabled = false;
    button.textContent = "Create";
  } else {
    button.disabled = true;
    button.textContent = "Enter text";
  }
}

// Собираем данные и выводим в <li>
function renderTodoListInContainer(list, container) {
  let output = "";
  for (let index in list) {
    output += `<li>${listOfTodos[index].title}</li>`;
  }
  domListOfTodos.innerHTML = output;
}
