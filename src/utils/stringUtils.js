// Функция отвечает за вывод только строки, не чисел и чтоб input не был пустым
function isStringNotNumberAndNotEmpty(value) {
    const isValueString = typeof value === "string"; // проверка на строку
    const isValueNotNumber = isNaN(parseInt(value)); // проверка на не число

    const result = isValueString && isValueNotNumber && value.length > 0; //  константа с результатом в которой константа с проверкой на строку, константа с проверкой на не число и проверка, чтоб длина введеного значения была больше 0

    return result; // возвращаем result
}

export { isStringNotNumberAndNotEmpty };