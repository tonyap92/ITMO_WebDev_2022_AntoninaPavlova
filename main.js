// import './style.css'
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";
import TodoVO from "./src/model/vos/TodoVO.js";
import {disabledButtonWhenTextInvalid} from "./src/utils/domUtils.js";
import {isStringNotNumberAndNotEmpty} from "./src/utils/stringUtils.js";
import {localStorageListOf, localStorageSaveListOfWithKey} from "./src/utils/databaseUtils.js";
import TodoView from "./src/view/TodoView.js";

const domInpTodoTitle = document.getElementById("inpTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick);
domInpTodoTitle.addEventListener("keyup", onInpTodoTitleKeyup);
domListOfTodos.addEventListener("change", onTodoListChange);

const LOCAL_LIST_OF_TODOS = "listOfTodos";
const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log(">Initial value -> listOfTodos", listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos); //рендеринг

disabledButtonWhenTextInvalid(
    domBtnCreateTodo,
    domInpTodoTitle.value,
    isStringNotNumberAndNotEmpty);

// domInpTodoTitle.value = "Todo text";


function onTodoListChange (event) {
  console.log(">onTodoListChange -> event:", event.target);

  const target = event.target;
  const index = target.id;

  if(index && typeof index === 'string') {
    const indexInt = parseInt(index.trim())
    const todoVO = listOfTodos[indexInt];

    console.log(">onTodoListChange -> todoVO:", indexInt, todoVO);

    todoVO.isCompleted = !!target.checked;
    saveListOfTodo ()
  }
}

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
    saveListOfTodo();
    renderTodoListInContainer(listOfTodos, domListOfTodos); //рендеринг
    domInpTodoTitle.value = '';
  }
}

function onInpTodoTitleKeyup(event) {
  console.log("> onInpTodoTitleKeyup:", event);
  const inputValue = event.currentTarget.value;
  console.log("> onInpTodoTitleKeyup:", inputValue);

  disabledButtonWhenTextInvalid(domBtnCreateTodo, inputValue, isStringNotNumberAndNotEmpty);
}

function renderTodoListInContainer(listOFTodoVO, container) {
  let output = "";
  let todoVO;
  for (let index in listOFTodoVO) {
    todoVO = listOFTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
 container.innerHTML = output;

}


function saveListOfTodo () {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos); //сохранили
}
