const numberbtn = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const equal = document.querySelector("[data-equal]");
const main_text = document.querySelector("[data-input]");
const second_text = document.querySelector("[data-history]");

let currentnumber = "",
  previousnumber = "",
  currentoperation = "";

// event listiners
clear.addEventListener("click", () => {
  Clear();
  update();
});
del.addEventListener("click", () => {
  Delete();
  update();
});
equal.addEventListener("click", () => {
  calc();
  update();
});
operation.forEach((op) => {
  op.addEventListener("click", () => {
    operationUpdate(op.innerHTML);
  });
});
numberbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    append(btn.innerHTML);
    update();
  });
});
// functions
function Clear() {
  (currentnumber = ""), (previousnumber = ""), (currentoperation = "");
}
function Delete() {
  currentnumber = currentnumber.substring(0, currentnumber.length - 1);
}
function GetDisplayNumber(number) {
  const floatnumber = parseFloat(number);
  if (number.toString() !== floatnumber.toString())
    return number.toLocaleString("en");
  if (isNaN(floatnumber)) return "";
  return floatnumber.toLocaleString("en");
}
function update() {
  main_text.innerHTML = GetDisplayNumber(currentnumber);
  second_text.innerHTML = GetDisplayNumber(previousnumber);
}
function append(number) {
  if (currentnumber.includes(".") && number === ".") return;
  currentnumber = currentnumber.toString() + number.toString();
}
function operationUpdate(opr) {
  if (currentnumber === "" || currentnumber === ".") return;
  if (previousnumber !== "") calc();
  currentoperation = opr;
  previousnumber = currentnumber;
  currentnumber = "";
  update();
  second_text.innerHTML = second_text.innerHTML + "" + currentoperation;
}
function calc() {
  let sum = 0;
  if (currentnumber === "" || previousnumber === "") return;
  switch (currentoperation) {
    case "+":
      sum = parseFloat(currentnumber) + parseFloat(previousnumber);
      break;
    case "×":
      sum = parseFloat(currentnumber) * parseFloat(previousnumber);
      break;
    case "-":
      sum = parseFloat(currentnumber) - parseFloat(previousnumber);
      break;
    case "÷":
      sum = parseFloat(currentnumber) / parseFloat(previousnumber);
      break;
  }
  previousnumber = "";
  currentnumber = sum;
}
