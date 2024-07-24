let firstNum = null;
let operator = '';
let secondNum = null;

let displayValue = '';

let newNumberFlag = false;

const buttons = document.querySelector(".button-container").addEventListener("click", (event) => {
    const parent = event.target.parentElement.className;
    console.log(parent)
    if (parent === 'button-container') return
    switch (parent) {
        case 'left-buttons':
            //number or clear button pressed pass event to function to deal with it
            numberPressed(event.target);
            break;
        
        case 'right-buttons':
            //operator button chosen call function to deal with it
            operatorPressed(event.target);
            break;
    
        default:
            //equal button pressed call function to handle with that
            equalsPressed();
            break;
    }
});

function numberPressed(node) {

    if (node.nodeName === 'DIV') return

    if (newNumberFlag) {
        clearDisplay();
        newNumberFlag = false;
    }

    switch (node.id) {
        case 'clear':
            resetCalc();
            break;
    
        case 'decimal':
            if (checkDecimal()) break;
            updateDisplay(node.textContent);
            break;

        default:
            updateDisplay(node.textContent);
            firstNum !== null && operator !== '' ? updateStorage(document.querySelector(".display span").textContent, 2):
                updateStorage(document.querySelector(".display span").textContent, 1);
            break;
    }
    
}

function operatorPressed(node) {

    if (node.nodeName === 'DIV') return

    newNumberFlag = true;

    if (secondNum !== null) {
        equalsPressed();
    }
    
    secondNum = null;

    operator = node.textContent;
}

function equalsPressed() {

    if (firstNum === null || secondNum === null) return
    if (operator === '') return

    let answer = calculateAns();

    updateStorage(answer, 1);
}

function calculateAns() {
    let answer = operate(firstNum,secondNum,operator)

    if (checkDecimal(answer)) answer = Number(answer.toPrecision(14));
    
    setDisplay(String(answer));
    if (answer === 'ERROR') answer = 0;
    return answer;
}

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
            console.log(`There is no operator`);
            break;
    }
}