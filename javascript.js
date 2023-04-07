let currentNumber = "";
let numbers = [];
let operators = [];

function clearDisplay()
{
    const display = document.querySelector("#display-text");
    display.textContent = "0";
}


function updateDisplay(input) {
    const display = document.querySelector("#display-text");
    display.textContent = (display.textContent === "0") ? "" : display.textContent;
    if(input === "clear")
    {
        clearDisplay();
        return;
    }
    else if(input === "+" || input === "x" || input === "-" || input === "/")
    {
        display.textContent = display.textContent + " " + input + " ";
        return;
    }
    display.textContent = display.textContent + input;
}

function clearData()
{
    currentNumber = "";
    operators = [];
    numbers = [];
    return;
}

function updateData(input)
{
    console.log("input: " + input);
    if(input === "clear")
    {
        clearData();
        return;
    }
    else if(input === "+" || input === "x" || input === "-" || input === "/")
    {

        numbers.push(currentNumber);
        currentNumber = "";
        operators.push(input);
        return;
    }
    else if(input === "=")
    {
        //calculate
        numbers.push(currentNumber);
        currentNumber = "";
        console.table(numbers);
        console.table(operators);
        calculate();
    }
    currentNumber = currentNumber + input;
}

function add(num1, num2)
{
    return parseFloat(num1) + parseFloat(num2);
}
function subtract(num1, num2)
{
    return num1 - num2;
}
function multiply(num1, num2)
{
    return parseFloat(num1) * parseFloat(num2);
}


function calculate()
{
    let index;
    for(let i = 0; i < operators.length; i++)
    {
        if((index = operators.indexOf("x")) !== -1)
        {
            let calculation = multiply(numbers[index], numbers[index+1]);
            numbers.splice(index, 2);
            numbers.splice(index, 0, `${calculation}`);
            operators.splice(index, 1);
            console.log(numbers);
            console.log(operators);
        }
        // else if((index = operators.indexOf("/")) !== -1)
    }
}

//check for button clicks
const buttons = document.querySelectorAll("button");
console.log(buttons);
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(e.target.id);
        updateDisplay(`${e.target.id}`);
        updateData(`${e.target.id}`);
    });
});