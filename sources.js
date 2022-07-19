const btns = document.querySelectorAll('.btn');
const screen = document.querySelector('.screen');
const clear = document.getElementById('clear');
const equal = document.querySelector('.equal');
const deleteKey = document.getElementById('delete');
let display = "";

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.textContent !== "="){
            display += btn.textContent;
            screen.textContent = display;
        }
    })
});

clear.addEventListener("click", () => {
    display = "";
    screen.textContent = display;
});

equal.addEventListener("click", calculate);

deleteKey.addEventListener("click", () => {
    screen.textContent = display
    .slice(0, -1);
    display = screen.textContent;
})

function calculate(){
    let tokens = display.split("");

    if (tokens[tokens.length - 1] === '+' ||
        tokens[tokens.length - 1] === '-' ||
        tokens[tokens.length - 1] === 'x' ||
        tokens[tokens.length - 1] === '/')
        {
            return;
        }
    let firstTokenIsNum = tokens[0] >= '0' && tokens[0] <= '9';
    if (!firstTokenIsNum)
        {
            return;
        }

    let values = [];
    let operators = [];
    for (let i = 0; i < tokens.length; ++i){
        if (tokens[i] >= '0' && tokens[i] <= '9')
            {
                let num = "";
                while (i < tokens.length &&
                        tokens[i] >= '0' &&
                            tokens[i] <= '9')
                {
                    num = num + tokens[i++];
                }
                values.push(parseInt(num, 10));
                i--;
            }
        else if (tokens[i] == '+' ||
            tokens[i] == '-' ||
            tokens[i] == 'x' ||
            tokens[i] == '/')
            {
            while (operators.length > 0 && checkPrecedence(tokens[i], 
                operators[operators.length - 1]))
                    {
                        values.push(operator(operators.pop(),
                        values.pop(),
                        values.pop()));
                    }

            operators.push(tokens[i]);
            }
    }
    while (operators.length > 0)
    {
        values.push(operator(operators.pop(),
                         values.pop(),
                        values.pop()));
    }

    screen.textContent = values.pop();
}

function checkPrecedence(op1, op2){
    if ((op1 == 'x' || op1 == '/') &&
               (op2 == '+' || op2 == '-'))
        {
            return false;
        }
        else
        {
            return true;
        }
}

function add (a, b){
    return a + b;
}

function subtract (a, b){
    return a - b;
}

function multiply (a, b){
    return a * b;
}

function divide (a, b){
    return a / b; 
}

function operator (operator, b, a){
    switch (operator){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            if (b === 0){
                alert("You cannot divide by 0");
                return null;
            }
            return divide(a, b);
        }
}

