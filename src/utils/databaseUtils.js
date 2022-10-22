
// функция, которая отвечает за проверку данных из локального хранилища
// если объект является массивом, то мы возвращаем объект
function localStorageListOf(key, defaultValue = []) {
    const value = localStorage.getItem(key); //константа в которую мы извлекаем даные из локального хранилища
/*    console.log(value);*/

    if (value == null) return defaultValue; // если в value объект отсутствует, то возвращаем defaultValue

    const parsedValue = JSON.parse(value); // константа в которой мы разбираем строку JSON и возвращаем объект

    const isParsedValueArray = Array.isArray(parsedValue); // константа в которой мы проверяем является ли объект массивом

    return isParsedValueArray ? parsedValue : defaultValue; // условие ? значение1 : значение2; Сначала вычисляется условие: если оно истинно, тогда возвращается значение1, в противном случае – значение2.
}


// функция, которая отвечает за сохранение в localStorage ключа и строки
function localStorageSaveListOfWithKey (key,list) {
    localStorage.setItem(key,JSON.stringify(list));// сохраняем в localStorage ключ и строку
}

export { localStorageListOf, localStorageSaveListOfWithKey };