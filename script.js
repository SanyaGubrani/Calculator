'use strict';

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('[value]'); 


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percentage = (a) => a/100;


const maxDisplayLength = 12; 
let displayValue = '';
let numberOne = 0; 
let numberTwo = 0;
let operation = '';


function operate(operation, x, y) {
    if (operation === '+') return add(x, y);
    if (operation === '-') return subtract(x, y);
    if (operation === '×') return multiply(x, y);
    if (operation === '÷') {
        if (y === 0) {
            alert('You cannot divide by zero!')
            displayValue = '';
            return '';
        }
        return divide(x, y);
    }

    if (operation === '%') return percentage(x);
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;

        if (buttonValue === 'clear'){
            clearDisplay();

        } else if (buttonValue === 'delete') {
            deleteDigits();

        } else if ('+-×÷%'.includes(buttonValue)) {
            OperationFunction(buttonValue)
  
        } else if (buttonValue === '=') {
            equalsButton();

        } else if (buttonValue === '.') {
            addDecimal();
            
        } else {
            appendDigit(buttonValue);
        }

        updateDisplay();
    });
});


function OperationFunction(buttonValue) {
    if (operation !== ''){
        calculation();
    }
    numberOne = parseFloat(displayValue);
    operation = buttonValue;
    displayValue = `${numberOne} ${operation} `;
}


function equalsButton() {
    if (operation !== '' && displayValue[displayValue.length - 2] === operation) {
        displayValue = displayValue.slice(0, -3);
    }
    calculation();
    operation = '';
}


function calculation() {
    numberTwo = parseFloat(displayValue.split(' ').pop());
    numberOne = operate(operation, numberOne, numberTwo);
    displayValue = numberOne.toString();
}


function appendDigit(digit) {
    if (displayValue.length < maxDisplayLength) {
        if (displayValue === '0') {
            displayValue = digit;
        } else {
            displayValue += digit;
  
        }
    }
}


function clearDisplay(){
    displayValue = '';
    numberOne = 0;
    numberTwo = 0;
    operation = '';
    updateDisplay()
}


function deleteDigits() {
    if (displayValue !== '') {
        displayValue = displayValue.slice(0, -1); 
    }
}


function addDecimal() {
    if (displayValue === '' || displayValue.endsWith('.')) {
        return; 
    }
    displayValue += '.';
}


function updateDisplay(){
    display.textContent = displayValue.length > maxDisplayLength ? 'Error' : displayValue;
}