// Добавляем прослушку на всем окне

window.addEventListener('click', function(event) {
    // проверяем элемент к + или -
    if (event.target.dataset.action === 'plus') {
        // находим родителя от кнопки
        const counterWrapper = event.target.closest('.counter-wrapper');

        const counter = counterWrapper.querySelector('[data-counter]');

        counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === 'minus') {
        // находим родителя от кнопки
        const counterWrapper = event.target.closest('.counter-wrapper');

        const counter = counterWrapper.querySelector('[data-counter]');

        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
            
        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText)===1) {
            // Удаляем товар из корзины
            event.target.closest('.cart-item').remove();

            // Проверяем пустая ли корзина
            toggleCartStatus();
            // Пересчет корзины
            calcCartPrice();
        }           

    }

    // Проверяем клик + или - и относится ли он к корзине
    if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
        // пересчет кокзины
        calcCartPrice();
    }
})
