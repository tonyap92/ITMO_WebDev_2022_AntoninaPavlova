// функция, которая отвечает за активность кнопки от соответствующих действий

function disabledButtonWhenTextInvalid (button, text, validateTextFunction, { textWhenDisabled, textWhenEnabled} = {}) {
    if (!validateTextFunction) throw new Error("Validate method must be defined");
    if (validateTextFunction(text)) {
        button.disabled = false; // кнопка активна (включена)
        if (textWhenEnabled) button.textContent = textWhenEnabled;
    }
    else {
        button.disabled = true; // кнопка неактивна (отключена)
        if (textWhenDisabled) button.textContent = textWhenDisabled;
    }
}

export { disabledButtonWhenTextInvalid };