let firstNum = null;
let operator = '';
let secondNum = null;

let displayValue = '';

const numbers = document.querySelector(".left-buttons");

numbers.addEventListener("click", (event) => {
    const number = event.target;

    if (number.nodeName === 'DIV') return

    switch (number.id) {
        case 'clear':
            resetCalc();
            break;
    
        case 'decimal':
            if (checkDecimal()) break;
            updateDisplay(number.textContent);
            break;

        default:
            updateDisplay(number.textContent);
            break;
    }
    
});

const operation = document.querySelector(".right-buttons");
operation.addEventListener("click", (event) => {
    const symbol = event.target
    if (symbol.nodeName === 'DIV') return

    operator = symbol.textContent;
    updateStorage(document.querySelector(".display span").textContent, 1);
    clearDisplay();
});

const calculate = document.querySelector("#equals");
calculate.addEventListener("click", () => {

    if (firstNum === null) firstNum = 0;
    if (operator === '') operator = '+';

    updateStorage(document.querySelector(".display span").textContent, 2);

    let answer = operate(firstNum,secondNum,operator)

    if (checkDecimal(answer)) answer = Number(answer.toPrecision(14));
    
    setDisplay(String(answer));

});

function updateStorage (value, selector = null) {
    if (selector === 1) firstNum = Number(value);
    else secondNum = Number(value);
}

function checkDecimal (value = null) {
    let number;
    if (value !== null) {number = String(value)}
    else {number = document.querySelector(".display span").textContent};
    if (number.split('').includes('.')) return true
    return false;
}

function setDisplay(value) {
    const display = document.querySelector(".display span");
    display.textContent = value;
}

function updateDisplay(value) {
    const display = document.querySelector(".display span");
    if (display.textContent.length === 1 && display.textContent === '0' && value !== '.') display.textContent = ''; 
    if (display.textContent.length < 14) display.textContent += value;
}

function resetCalc() {
    clearDisplay();
    clearStorage();
}

function clearStorage() {
    firstNum = null;
    secondNum = null;
    operator = '';
}

function clearDisplay() {
    const display = document.querySelector(".display span");
    display.textContent = '0';
}

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b === 0) return 'ERROR';
    return a / b;
}

function operate(first, second, operator) {
    switch (operator) {
        case '+':
            return add(first,second);
    
        case '−':
            return subtract(first,second);

        case '×':
            return multiply(first,second);
        
        case '÷':
            return divide(first,second);

        default:
            break;
    }
}