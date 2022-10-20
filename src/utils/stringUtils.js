// Функция отвечает за вывод только строки, не чисел и чтоб input не был пустым
function isStringNotNumberAndNotEmpty(value) {
    const isValueString = typeof value === "string"; // проверка на строку
    const isValueNotNumber = isNaN(parseInt(value)); // проверка на не число

    const result = isValueString && isValueNotNumber && value.length > 0;

    return result;
}

export { isStringNotNumberAndNotEmpty };