const screen = document.querySelector('.screen');
screen.textContent = '';

let operatorCount = 0;
let dotUsed = false;
const operators = ["+", "-", "/", "x", "%", "^"];

const btnList = Array.from(document.querySelectorAll('.btn'));
btnList.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        switch (e.target.getAttribute("class")) 
        {
            case "btn operator":
                operatorCount++;
                if (operatorCount == 2) {
                    operate();
                }
                screen.textContent += e.target.getAttribute("value");
                break;
            case "btn calculate":
                operate();
                break;
            case "btn decimal":
                if (!dotUsed)
                {
                    screen.textContent += e.target.getAttribute("value");
                    dotUsed = true;
                }
                break;
            case "btn ac":
                screen.textContent = '';
                dotUsed = false;
                operatorCount = 0;
                break;
            case "btn backspace":
                const arr = screen.textContent.split('');
                let removed = arr.pop();
                if (removed == '.')
                {
                    dotUsed = false;
                }
                if (operators.some((op) => removed.includes(op)))
                {
                    operatorCount--;
                }
                screen.textContent = arr.join('');
                break;
            default:
                screen.textContent += e.target.getAttribute("value");
        }
    });
});

function operate()
{
    operatorCount = 1;

    let operator = '';
    operators.some((op) => {
        if (screen.textContent.includes(op))
        {
            operator = op;
        }
    });
    const nums = screen.textContent.split(operator);

    switch (operator)
    {
        case '+':
            screen.textContent = add(nums);
            break;
        case '-':
            screen.textContent = subtract(nums);
            break;
        case 'x':
            screen.textContent = multiply(nums);
            break;
        case '/':
            screen.textContent = divide(nums);
            break;
        case '%':
            screen.textContent;
            break;
        case '^':
            screen.textContent;
    }    
}

function add(num1, num2)
{
    return (num1 + num2);
}

function subtract(num1, num2)
{
    return (num1 - num2);
}

function multiply(num1, num2)
{
    return (num1 * num2);
}

function divide(num1, num2)
{
    return (num1 / num2);
}