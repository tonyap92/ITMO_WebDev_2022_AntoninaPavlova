const inputFirstName = document.querySelector("#first_name");
const inputLastName = document.querySelector("#last_name");
const inputFullName = document.querySelector("#full_name");

const inputFullNameArr = [inputFirstName, inputLastName];
// console.log("> inputFullNameArr:", inputFullNameArr);

function outputValuesFromInputs() {
  const inputFullNameFilter = inputFullNameArr.filter(({ value }) => value);
  // console.log("> inputFullNameFilter:", inputFullNameFilter);

  const inputFullNameMap = inputFullNameFilter.map(({ value }) => value);
  // console.log("> inputFullNameMap:", inputFullNameMap);

  inputFullName.value = inputFullNameMap.join(" ");
}

inputFullNameArr.forEach(function (input) {
  input.addEventListener("keyup", outputValuesFromInputs);
});
