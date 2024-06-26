// Получаем URL адрес текущей страницы
const urlParams = new URLSearchParams(window.location.search);

// Получаем значение параметра 'title'
const title = urlParams.get('title');

// Выводим значение параметра 'title' в консоль
console.log(title);

// Меняем название категории меню
const nameSubMenu = document.querySelector('.nameSubMenu');
nameSubMenu.querySelector('h4').innerText = title;



//  отрисовываем меню по категориям

    // Получаем ссылку на категорию
    const myUrl = `http://147.45.109.158:8881/api/category?category=${title}`

    // создаем функцию запроса
    function fetchData (url) {
        return fetch(url)
        .then (response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);        
            }
            return response.json();
        })
        .catch (error => {
            console.error(`Error data`, error);
            throw error
        })
    }

    // div меню
    const menuCard = document.querySelector('.menuContent');

    // Применение функции
    fetchData(myUrl)
        .then(data => {
            // console.log(`Полученные данные-`, data, `Type-`, typeof data) 
            const menuData = data;
            // console.log(menuData) 
            // Проходим по массиву
            menuData[title].forEach(dish => {
                /* Создаем объект товара и извлекаем id, название, изображение, 
                описание, вес, цену, калорийность, белки, жиры, углеводы блюда из ответа сервера */
            const productInfo = {
                id: dish.id,
                dishName: dish.name,
                dishImage: dish.imageLinks[0],
                dishDescr: dish.description,
                dishPrice: dish.currentPrice,
                dishWeight: dish.weight, // вес 
                dishEnergy: dish.energyFullAmount, // энергетическая ценность во всем блюде
                dishProt: dish.proteinsFullAmount, //белки (во всем блюде)
                dishFat: dish.fatFullAmount, //жиры
                dishCarbohy: dish.carbohydratesFullAmount, //углеводы
            };
            console.log(`Type-`, typeof productInfo.dishWeight)

            // Создаем шаблон
            const cartItemHTML = 
            `<div class="col-sm-6 col-md-4 mb-3 mr-5">
            <div class="card-product mb-4" data-id="${productInfo.id}">
            <img class="fullImg" src="${productInfo.dishImage}" alt="">
            <div class="card-body text-center">
                <div class="nameTitleKBU d-flex">
                <h4 class="item-title mb-0">${productInfo.dishName}</h4>
                    <button type="button" class="btn btn-secondary btnKBU" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" 
                    data-bs-title="<div class='d-flex justify-content-between'><span class='mr-15'>Калорийность</span><span class='valEnerg'>${productInfo.dishEnergy}</span>г.</div>
                    <div class='d-flex justify-content-between'><span>Белки</span><span class='valProt'>${productInfo.dishProt}<span>г.</span></span></div>
                    <div class='d-flex justify-content-between'><span>Жиры</span><span class='valFat'>${productInfo.dishFat}<span>г.</span></span></div>
                    <div class='d-flex justify-content-between'><span>Углеводы</span><span class='valCarb'>${productInfo.dishCarbohy}<span>г.</span></span></div>">
                    КБЖУ
                    </button>
                </div>
                <p><small data-items-in-box class="text-muted">${productInfo.dishDescr}</small></p>
                <div class="details-wrapper">
                <div class="items counter-wrapper">
                    <div class="items__control" data-action="minus">-</div>
                    <div class="items__current" data-counter>1</div>
                    <div class="items__control" data-action="plus">+</div>
                </div>
                <div class="price">
                    <div class="price__weight"><span class="weigthItem">${productInfo.dishWeight}</span>г.</div>
                    <div class="price__currency"><span class="priceItem">${productInfo.dishPrice}</span>₽</div>
                </div>
                </div>
                <button data-cart type="button" class="btn btn-block btn-outline-warning btn-color"><span class="btnText">+ в корзину</span></button>
            </div>
            </div>
    </div>`

            
            // добавляем шаблон в корзину
            menuCard.insertAdjacentHTML('beforeend', cartItemHTML);

            // Инициализируем Tooltip для новых элементов
            const tooltipTriggerList = [].slice.call(menuCard.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
            });


            // установка одинаковой высоты карточек 
            // Получаем все карточки
            // const cards = document.querySelectorAll('.card');

            //   // Находим максимальную высоту
            // let maxHeight = 0;
            // cards.forEach(card => {
            // const height = card.offsetHeight;
            // if (height > maxHeight) {
            //     maxHeight = height;
            // }
            // });

            // // Применяем максимальную высоту ко всем карточкам
            // cards.forEach(card => {
            // card.style.height = `${maxHeight}px`;
            // });


            });
        });

            

