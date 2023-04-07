let currentNumber = "";
let numbers = [];
let operators = [];
let off = true;

function clearDisplay()
{
    const display = document.querySelector("#display-text");
    if(off)
    {
        display.textContent = "";
        return;
    }
    display.textContent = "0";
}


function updateDisplay(input) {
    const display = document.querySelector("#display-text");
    display.textContent = (display.textContent === "0") ? "" : display.textContent;
    
    if(!off)
    {
        if(input === "clear")
        {
            clearData();
            clearDisplay();
            return;
        }
        else if(input === "off")
        {
            off = true;
            clearDisplay();
            clearData();
            return;
        }
        else if(input === "+" || input === "x" || input === "-" || input === "/")
        {
            console.log("operators: " + operators.length);
            console.log("numbers: " + numbers.length);
            if((operators.length <= numbers.length) && display.textContent !== "")
            {
                display.textContent = display.textContent + " " + input + " ";
                return;
            }
            display.textContent = "0";
            return;
        }
    }
    else
    {
        if(input === "clear")
        {
            off = false;
            clearData();
            clearDisplay();
            return;
        }
        return;
    }
    if(currentNumber.length < 10 && display.textContent.length < 21)
    {
        if(input !== "=")
        {
            display.textContent = display.textContent + input;
        }
    }
    return;
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
    const display = document.querySelector("#display-text");
    console.log("input: " + input);
    if(input === "clear")
    {
        clearData();
        return;
    }
    else if(input === "+" || input === "x" || input === "-" || input === "/")
    {
        if(operators.length <= numbers.length && display.textContent !== "0")
        {
            numbers.push(currentNumber);
            currentNumber = "";
            operators.push(input);
            return;
        }
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
        return;
    }

    if(currentNumber.length < 10 && display.textContent.length < 21)
    {
        currentNumber = currentNumber + input;
    }
    
}

function displayAnswer(answer)
{
    clearData();
    clearDisplay();
    const display = document.querySelector("#display-text")
    display.textContent = `${answer}`;
}

function add(num1, num2)
{
    return parseFloat(num1) + parseFloat(num2);
}
function subtract(num1, num2)
{
    return parseFloat(num1) - parseFloat(num2);
}
function multiply(num1, num2)
{
    return parseFloat(num1) * parseFloat(num2);
}
function divide(num1, num2)
{
    return parseFloat(num1) / parseFloat(num2);
}


function calculate()
{
    let index;
    let length = operators.length;
    for(let i = 0; i < length; i++)
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
        else if((index = operators.indexOf("/")) !== -1)
        {
            let calculation = divide(numbers[index], numbers[index+1]);
            numbers.splice(index, 2);
            numbers.splice(index, 0, `${calculation}`);
            operators.splice(index, 1);
            console.log(numbers);
            console.log(operators);
        }
        else if((index = operators.indexOf("+")) !== -1)
        {
            let calculation = add(numbers[index], numbers[index+1]);
            numbers.splice(index, 2);
            numbers.splice(index, 0, `${calculation}`);
            operators.splice(index, 1);
            console.log(numbers);
            console.log(operators);
        }
        else if((index = operators.indexOf("-")) !== -1)
        {
            let calculation = subtract(numbers[index], numbers[index+1]);
            numbers.splice(index, 2);
            numbers.splice(index, 0, `${calculation}`);
            operators.splice(index, 1);
            console.log(numbers);
            console.log(operators);
        }
    }
    let answer = numbers[0];
    displayAnswer(answer);
    currentNumber = answer;
}

//check for button clicks
const buttons = document.querySelectorAll("button");
console.log(buttons);
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(e.target.id);
        if(!off)
        {
            updateData(`${e.target.id}`);
            updateDisplay(`${e.target.id}`);
        }
        else
        {
            updateDisplay(`${e.target.id}`);
        }
    });
});