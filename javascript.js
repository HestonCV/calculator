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

function backSpace()
{
    
    const display = document.querySelector("#display-text");

    if(currentNumber)
    {
        //remove the number from data
        currentNumber = currentNumber.slice(0, -1);

        //remove the number from display
        display.textContent = display.textContent.slice(0, -1);
        if(display.textContent === "")
        {
            clearDisplay();
            clearData();
        }
    }
    else
    {
        if(display.textContent[display.textContent.length - 1] === " ")
        {
            console.log("test");
            //remove the operator from data
            operators.pop();

            //remove the operator from the screen
            display.textContent = display.textContent.slice(0, -3);
            currentNumber = numbers[numbers.length - 1];
            numbers = numbers.slice(0, numbers.length - 1);
        }
    }
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
        else if(input == "backspace")
        {
            backSpace();
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
            if(currentNumber)
            {
                currentNumber = "";
                display.textContent = display.textContent + " " + input + " ";
                return;
            }
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
    if(currentNumber.length < 10 && display.textContent.length < 20)
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
    if(input === "clear")
    {
        clearData();
        return;
    }
    else if(input === "backspace")
    {
        return;
    }
    else if(input === "+" || input === "x" || input === "-" || input === "/")
    {
        if(currentNumber)
        {
            numbers.push(currentNumber);
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
        calculate();
        return;
    }

    if(currentNumber.length < 10 && display.textContent.length < 20)
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
    if(!answer) display.textContent = "0";

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
    if(parseFloat(num2) === parseFloat(0))
    {
        const display = document.querySelector("#display-text");
        display.textContent = "ERROR: Divide By Zero";

        setTimeOut(function () {
            clearData();
            clearDisplay();
        }, 500);
    }
    else
    {
        return parseFloat(num1) / parseFloat(num2);
    }
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
        button.classList.add("pressed");
        if(!off)
        {
            updateData(`${e.target.id}`);
            updateDisplay(`${e.target.id}`);
        }
        else
        {
            updateDisplay(`${e.target.id}`);
        }

        
        // add timeout function to toggle transition class after 2 seconds
        setTimeout(function() {
            button.classList.remove('pressed');
        }, 100);
    });
});