const glassmorphism = "glassmorphism";
const neumorphism = "neumorphism";
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", (e) => {
  document.body.classList.contains(glassmorphism)
    ? document.body.classList.replace(glassmorphism, neumorphism)
    : document.body.classList.replace(neumorphism, glassmorphism);
});

const display = document.getElementById("display");
const keys = document.getElementById("keys");

const operators = ["+", "-", "*", "/"];
let decimalAdded = false;

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = e.target.dataset.action;
    const keyContent = key.textContent;
    const dispalyedNum = display.textContent;

    // clear button
    if (action === "clear") {
      display.textContent = "0";
      decimalAdded = true;
    }

    // number buttons
    if (action === "number") {
      if (dispalyedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = dispalyedNum + keyContent;
      }
    }

    // decimal button
    if (action === "decimal") {
      if (!decimalAdded) {
        display.textContent += keyContent;
        decimalAdded = true;
      }
    }

    // operator buttons
    if (operators.includes(keyContent)) {
      let lastChar = dispalyedNum[dispalyedNum.length - 1];

      // only add operator if dispalyedNum is not "0"
      if (dispalyedNum != "" && !operators.includes(lastChar)) {
        display.textContent += keyContent;
      }
      // allow minus operator if the string is "0"
      if (dispalyedNum === "0" && keyContent === "-") {
        display.textContent = keyContent;
      }
      // replace the last operator with newly pressed operator
      if (operators.includes(lastChar) && dispalyedNum.length > 1) {
        display.textContent = dispalyedNum.replace(/.$/, keyContent);
      }
    }

    // calculate button
    if (action === "calculate") {
      let equation = dispalyedNum;

      if (equation) {
        let result = eval(equation);

        if (Number.isFinite(result)) {
          let decimalStr = result.toString().split(".")[1];

          if (decimalStr && decimalStr.length > 5) {
            result = result.toFixed(5);
          }
        }

        display.textContent = result;
        decimalAdded = false;
      }
    }
  }
});
