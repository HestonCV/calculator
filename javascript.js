let currentNumber = "";
let numbers = [];
let operators = [];


function updateDisplay(input) {
    const display = document.querySelector("#display-text");
    display.textContent = (display.textContent === "0") ? "" : display.textContent;
    if(input === "+")
    {
        display.textContent = display.textContent + " " + input + " ";
        return;
    }
    display.textContent = display.textContent + input;
}

function add(num1, num2)
{
    return parseFloat(num1) + parseInt(num2);
}
function subtract(num1, num2)
{
    return num1 - num2;
}

operators = ["+", "+"]
numbers = ["5", "50", "50"];


function calculate()
{
    let index;
    if((index = operators.indexOf("*")) !== -1)
    {
        
    }
}

//calculate return =