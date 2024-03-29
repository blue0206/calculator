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
                dotUsed = false;
                operatorCount++;
                if (operatorCount == 2) {
                    operate();
                }
                screen.textContent += e.target.getAttribute("value");
                break;
            case "btn calculate":
                dotUsed = false;
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

    let ans = '';

    switch (operator)
    {
        case '+':
            ans = add(nums);
            break;
        case '-':
            ans = subtract(nums);
            break;
        case 'x':
            ans = multiply(nums);
            break;
        case '/':
            ans = divide(nums);
            break;
        case '%':
            ans = percent(nums);
            break;
        case '^':
            ans = power(nums);
    }
    
    screen.textContent = ans;
}

function add(nums)
{
    return (nums.reduce((sum, num) => {
        return (sum + parseFloat(num));
    }, 0));
}

function subtract(nums)
{
    return (nums.reduce((accumulator, num) => {
        return (accumulator - parseFloat(num));
    }, parseFloat(nums[0])*2));
}

function multiply(num1, num2)
{
    return (num1 * num2);
}

function divide(num1, num2)
{
    return (num1 / num2);
}

function percent(nums)
{

}

function power(nums)
{

}