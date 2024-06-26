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
                if (operatorCount == 2) 
                {
                    operatorCount--;
                    operate();
                }
                screen.textContent += e.target.getAttribute("value");
                break;
            case "btn calculate":
                dotUsed = false;
                operatorCount--;
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
    switch(btn.getAttribute('class'))
    {
        case "btn ac":
            btn.style.backgroundColor = 'black';
            btn.style.color = 'aliceblue';
            break;
        case "btn backspace":
            btn.style.backgroundColor = 'grey';
            btn.style.color = 'aliceblue';
            break;
        case "btn operator":
            btn.style.backgroundColor = 'rgb(187, 123, 81)';
            break;
        case "btn decimal":
            btn.style.backgroundColor = 'aqua';
            break;
        case "btn calculate":
            btn.style.backgroundColor = 'blue';
            btn.style.color = 'aliceblue';
    }
});

document.addEventListener("keyup", (press) => {
    let clickEvent = new MouseEvent('click');

    btnList.forEach((btn) => {
        if (btn.getAttribute('value') == press.key)
        {
            btn.dispatchEvent(clickEvent);
        }
    });
    switch (press.key)
    {
        case '*':
            document.querySelector('[value=x]').dispatchEvent(clickEvent);
            break;
        case 'Backspace':
            document.querySelector('.backspace').dispatchEvent(clickEvent);
            break;
        case 'Delete':
            document.querySelector(".ac").dispatchEvent(clickEvent);
            break;
        case 'Enter':
        case '=':
            document.querySelector(".calculate").dispatchEvent(clickEvent);
    }
});

function operate()
{
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
    
    if (isNaN(ans))
    {
        screen.textContent = '0';
    }
    else
    {
        screen.textContent = fixDecimal(ans);
    }
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

function multiply(nums)
{
    return (nums.reduce((product, num) => {
        return (product * parseFloat(num));
    }, 1));
}

function divide(nums)
{
    return (nums.reduce((numerator, denominator) => {
        return (numerator / parseFloat(denominator));
    }, parseFloat(nums[0])*parseFloat(nums[0])));
}

function percent(nums)
{
    return ((parseFloat(nums[0])/100.0) * parseFloat(nums[1]));
}

function power(nums)
{
    return Math.pow(nums[0], nums[1]);
}

function fixDecimal(num)
{
    let fixedNum = num;
    let str = '';
    str += num;

    const arr = str.split('.');
    if (arr.length == 1)
    {
        return fixedNum;
    }

    const decimals = arr[1].split('');
    if (decimals.length > 8)
    {
        fixedNum = fixedNum.toFixed(8);
    }
    return fixedNum;
}