'use strict';

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('[value]'); 


//Airthmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percentage = (a) => a/100;


let isDigit = false;
const maxDisplayLength = 12; 
let displayValue = '';
let numberOne = 0; 
let numberTwo = 0;
let operation = '';


// Perform arithmetic operations
function operate(operation, x, y) {
    if (operation === '+') return add(x, y);
    if (operation === '-') return subtract(x, y);
    if (operation === '×') return multiply(x, y);
    if (operation === '÷') {
        //Handling ZeroDivisioneError
        if (y === 0) {
            alert("Dividing by zero is forbidden. 🔪")
            displayValue = '';
            return '';
        }
        return divide(x, y);
    }
    if (operation === '%') return percentage(x);
}


// Event listeners for  all the button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;

        if (!isDigit && '+-×÷%'.includes(buttonValue)) {
            return;
        }

        if (buttonValue === 'clear'){
            clearDisplay();

        } else if (buttonValue === 'delete') {
            deleteDigits();

        } else if ('+-×÷%'.includes(buttonValue)) {
            if (!isDigit) {
                return;
            }
            isDigit = false;
            OperationFunction(buttonValue)
  
        } else if (buttonValue === '=') {
            equalsButton();

        } else if (buttonValue === '.') {
            addDecimal();
            
        } else {
            isDigit = true;
            appendDigit(buttonValue);
        }

        updateDisplay();
    });
});


//Handling and displaying the operator buttons
function OperationFunction(buttonValue) {
    if (operation !== ''){
        calculation();
    }
    numberOne = parseFloat(displayValue);
    operation = buttonValue;
    displayValue = `${numberOne} ${operation} `;
}


//Handling the equals button
function equalsButton() {
    if (operation !== '' && displayValue[displayValue.length - 2] === operation) {
        displayValue = displayValue.slice(0, -3);
    }
    calculation();
    operation = '';
}


//Performing calculations (Evaluating single pair of numbers at a time)
function calculation() {
    numberTwo = parseFloat(displayValue.split(' ').pop());
    numberOne = operate(operation, numberOne, numberTwo);
    displayValue = numberOne.toString();
}


//Appending digits to displayValue
function appendDigit(digit) {
    if (displayValue.length < maxDisplayLength) {
        if (displayValue === '0') {
            displayValue = digit;
        } else {
            displayValue += digit;
  
        }
    }
}


//Clear Display & Reset Values
function clearDisplay(){
    displayValue = '';
    numberOne = 0;
    numberTwo = 0;
    operation = '';
    updateDisplay()
}


//Backspace button 
function deleteDigits() {
    if (displayValue !== '') {
        displayValue = displayValue.slice(0, -1); 
    }
}


//Adding decimal point to displayValue (only one decimal in numOne & numTwo)
function addDecimal() {
    if (displayValue === '' || displayValue.endsWith('.')) {
        return; 
    }
    displayValue += '.';
}


//Update the display content
function updateDisplay(){
    display.textContent = displayValue.length > maxDisplayLength ? 'Error' : displayValue;
}