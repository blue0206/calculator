const screen = document.querySelector('.screen');
screen.textContent = '';

const btnList = Array.from(document.querySelectorAll('.btn'));
btnList.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        screen.textContent += e.target.id;
    })
});

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