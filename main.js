// import './style.css'
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";
import TodoVO from "./src/model/vos/TodoVO.js";
import { disabledButtonWhenTextInvalid } from "./src/utils/domUtils.js";
import { isStringNotNumberAndNotEmpty } from "./src/utils/stringUtils.js";
import { localStorageListOf, localStorageSaveListOfWithKey } from "./src/utils/databaseUtils.js";
import TodoView from "./src/view/TodoView.js";
import { forEach } from "carbon-web-components/es/globals/internal/collection-helpers.js";

const domInpTodoTitle = document.getElementById("inpTodoTitle"); // инпут
const domBtnCreateTodo = document.getElementById("btnCreateTodo"); // кнопка
const domListOfTodos = document.getElementById("listOfTodos"); // список

// console.log(activeItemListOfTodos);

let selectedTodoVO = null; // переменная ничего не содержит
let selectedTodoViewItem = null; // переменная ничего не содержит

// отслеживание событий у элементов и выполнение функции после события
domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick); // событие срабатывает по клику
domInpTodoTitle.addEventListener("keyup", onInpTodoTitleKeyup); // событие срабатывает, когда клавиша была отпущена
domListOfTodos.addEventListener("change", onTodoListChange); // событие срабатывает, когда пользователь изменяет значение элемента
domListOfTodos.addEventListener("click", (event) => {
  console.log(">domListOfTodos click-> event", event.target);
  console.log(">domListOfTodos click-> :", event.dataset);
  if (event.target.dataset["type"] !== TodoView.TODO_VIEW_ITEM) return; //data-type не todoitem возвращаем

  if (selectedTodoViewItem != null) resetSelectedTodo(); //запуск функции, которая отвечает за чистку input в localStorage// если строка листа не нуль, то запускаем функцию сброса (возвращает true)}
  console.log("Я selectedTodoVO:", selectedTodoVO);

  selectedTodoViewItem = event.target; // строка исходный элемент, на котором произошло событие

  console.log("Я Item:", selectedTodoViewItem);
  console.log("Я selectedTodoVO:", selectedTodoVO);

  if (selectedTodoVO == null) {
    //если массив пустой (неактивное состояние у строк листа)
    // selectedTodoVO == null вернет true
    const todoID = event.target.id; //константа с уникальным id
    const todoVO = listOfTodos.find((item) => item.id === todoID); //Метод find() возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию
    // console.log(">domListOfTodos click-> todoVO", todoVO);
    domInpTodoTitle.value = todoVO.title; //выводим то имя, которой было сохранено уже в массиве списке
    domBtnCreateTodo.innerText = "Update"; //выводим у кнопки текст update
    selectedTodoVO = todoVO; // selectedTodoVO передаем, тот объект, которой было сохранено уже в списке
    // selectedTodoViewItem.style.border = "1px solid red";
    selectedTodoViewItem.style.background = "#f5f5f5"; // меняем фон на серые

    console.log("Я selectedTodoVO = todoVO", selectedTodoVO);
  } else {
    // console.log(">resetSelectedTodo-> :", event.dataset);
    resetSelectedTodo(); // запуск функции сброса
  }
});

const LOCAL_LIST_OF_TODOS = "listOfTodos"; // константа со строкой listOfTodos (надпись отображается в key localStorage)
const LOCAL_INPUT_TEXT = "inputText"; // константа со строкой inputText (надпись отображается в key localStorage)

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS); // константа в которой запускам функции, которая отвечает за проверку данных из локального хранилища на объект
/*console.log(">Initial value -> listOfTodos", listOfTodos);*/

domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT); // передача ключа input в localStorage
render_TodoListInContainer(listOfTodos, domListOfTodos); //запуск функций рендеринга
disableOrEnable_CreateTodoButtonOnTodoInputTitle(); //запуск функции, которая отвечает за disable Or Enable кнопки

// domInpTodoTitle.value = "Todo text";

// функция, которая добавляет изменения в input при чекнутом/не чекнутом чекбоксе
function onTodoListChange(event) {
  // console.log(">onTodoListChange -> event:", event.target);

  const target = event.target; // ссылкается на кликнутый чекбокс
  const index = target.id; // присвайваем id значение index

  if (index && typeof index === "string") {
    // проверка индекса на строку
    const indexInt = parseInt(index.trim()); // parseInt преобразует первый переданный ей аргумент в строковый тип, интерпретирует его и возвращает целое число. Метод trim() удаляет пробельные символы с начала и конца строки
    const todoVO = listOfTodos[indexInt]; // изменяется состояние isCompleted: при чекнутом или нечекнутом чекбоксе

    // console.log(">onTodoListChange -> todoVO:", indexInt, todoVO);

    todoVO.isCompleted = !!target.checked; // isCompleted: false  = чекнут
    save_ListOfTodo(); //запуск функции сохранения
  }
}

// функция, которая запускается по клику кнопки
function onBtnCreateTodoClick(e) {
  // console.log("> domBtnCreateTodo -> handle(click)", e);
  const todoTitleValueFromDomInput = domInpTodoTitle.value; // переменная в которую записываем введенное значение из инпут
  // console.log("> domBtnCreateTodo -> todoInputTitleValue:", todoTitleValueFromDomInput);

  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    //если введеное значение прошло проверку на строку (запуск функции на проверку для постоянной - введеный данных в инпут)
    if (selectedTodoVO) {
      // если объект есть
      selectedTodoVO.title = todoTitleValueFromDomInput; // исправленный title из списка и вернувший обратно
      // console.log(selectedTodoVO);
      // console.log(selectedTodoVO.title);
      resetSelectedTodo(); // чистка
    } else {
      create_TodoFromTextAndAddToList(todoTitleValueFromDomInput, listOfTodos); //запуск функции, которая отвечает за добавление в наш объект "listOfTodos" - class TodoVO
      selectedTodoVO = null;
    }

    save_ListOfTodo(); // запуск функции  save_ListOfTodo
    clear_InputTextAndLocalStorage(); //запуск функции, которая отвечает за чистку input в localStorage
    render_TodoListInContainer(listOfTodos, domListOfTodos); //выводим значение в список и в
    disableOrEnable_CreateTodoButtonOnTodoInputTitle(); //запуск функции, которая отвечает за disable Or Enable кнопки
  }
}

function resetSelectedTodo() {
  selectedTodoVO = null; //selectedTodoVO передаем, то имя, которой было сохранено уже в списке = null

  domBtnCreateTodo.innerText = "Create"; // у кнопки выводим текст Create
  domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT); //добавляем значение из инпут в localStorage, то после обновления тодо он будет востановлен

  // console.log("Я selectedTodoVO", selectedTodoVO);
  // console.log("Привет, я Reset, когда selectedTodoVO = null");

  if (selectedTodoVO) {
    // если selectedTodoVO true/ нуль
    selectedTodoViewItem.style.background = "";
    // console.log("Привет, я Reset, если selectedTodoVO не null");
  }
}

// функция, котороая отвечает за последующие действия с введенным в инпут значением, после отпущеной клавиши
function onInpTodoTitleKeyup(event) {
  /* console.log("> onInpTodoTitleKeyup:", event);*/
  const inputValue = event.currentTarget.value; //константа, которой присвоили значение введеное в инпут, когда клавиша была отпущена
  // (event.currentTarget используется, когда один и тот же обработчик события присваивается нескольким элементам.)
  // console.log("> onInpTodoTitleKeyup:", inputValue);

  localStorage.setItem(LOCAL_INPUT_TEXT, inputValue); //сохраняем ключ и значение input в localStorage
  disableOrEnable_CreateTodoButtonOnTodoInputTitle(); // запуск функции, которая отвечает за disable Or Enable кнопки
}

// функция, которая отвечает за вывод данных дел, что осуществляется перебором массива listOFTodoVO
// и формировать на его основе выводную строку, которую запишет domListOfTodos.
function render_TodoListInContainer(listOFTodoVO, container) {
  let output = ""; // очищаем всё внутри
  let todoVO; // переменная  todoVO, которой присвоим значение позже
  for (let index in listOFTodoVO) {
    // перебор в массиве
    todoVO = listOFTodoVO[index]; // объект, чертеж -который создается после введения по клику
    output += TodoView.createSimpleViewFromVO(index, todoVO); // запускаем функции которая отвечает за внешний вид строки и передаем значение
  }
  container.innerHTML = output; // выводим в container
}

//функция, которая отвечает за добавление в наш объект "listOfTodos" - class TodoVO
function create_TodoFromTextAndAddToList(input, listOfTodos) {
  // console.log(input);
  const newTodoVO = TodoVO.createFromTitle(input); //(новый чертеж по которому мы будем хранить данные)
  listOfTodos.push(newTodoVO); //добавляем в наш объект "listOfTodos" - new class TodoVO
}

// функция, которая отвечает за чистку input в localStorage
function clear_InputTextAndLocalStorage() {
  domInpTodoTitle.value = ""; // очищаем значение
  localStorage.removeItem(LOCAL_INPUT_TEXT); //удаляем сохраненое значение input в localStorage
}

// функция, которая отвечает за disable Or Enable кнопки
function disableOrEnable_CreateTodoButtonOnTodoInputTitle() {
  const textToValidate = domInpTodoTitle.value; // константа в которую сохраняем то, что ввели в input
  disabledButtonWhenTextInvalid(domBtnCreateTodo, textToValidate, isStringNotNumberAndNotEmpty); // запуск функции с активностью кнопки
}

// функция, которая отвечает за сохранение ListOfTodo
function save_ListOfTodo() {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos); //сохранили
}
