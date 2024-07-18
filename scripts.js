let firstNum = null;
let operator = '';
let secondNum = null;

let displayValue = '';

const display = document.querySelector(".display span");

const numbers = document.querySelector(".left-buttons");

numbers.addEventListener("click", (event) => {
    const number = event.target;

    if (number.nodeName === 'DIV') return

    switch (number.id) {
        case 'clear':
            clearDisplay();
            break;
    
        case 'decimal':
            if (checkDecimal()) break;
            appendDisplay(number.textContent);
            break;

        default:
            appendDisplay(number.textContent);
            break;
    }
    
});

const operation = document.querySelector(".right-buttons");
operation.addEventListener("click", (event) => {
    const symbol = event.target
    if (symbol.nodeName === 'DIV') return

    operator = symbol.textContent;
});

function checkDecimal () {
    if (display.textContent.split('').includes('.')) return true
    return false;
}

function appendDisplay(value) {
    if (display.textContent.length === 1 && display.textContent === '0' && value !== '.') display.textContent = ''; 
    if (display.textContent.length < 14) display.textContent += value;
}


function clearDisplay() {
    display.textContent = '';
    firstNum = null;
    secondNum = null;
    operator = '';
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
            break;
    
        case '-':
            return subtract(first,second);
            break;

        case '*':
            return multiply(first,second);
            break;
        
        case '/':
            return divide(first,second);
            break;

        default:
            break;
    }
}