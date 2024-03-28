const screen = document.querySelector('.screen');
screen.textContent = '';

const btnList = Array.from(document.querySelectorAll('.btn'));
btnList.forEach((btn) => {
    if (btn.id != 'ac' && btn.id != 'backspace' && btn.id != '=')
    {
        btn.addEventListener('click', (e) => {
            screen.textContent += e.target.id;
        });
    }
});

document.querySelector('#ac').addEventListener('click', () => {
    screen.textContent = '';
});

document.querySelector('#backspace').addEventListener('click', () => {
    const arr = screen.textContent.split('');
    arr.pop();
    screen.textContent = arr.join('');    
})

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