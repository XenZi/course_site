const Basket = () => {
    const basketDIV = document.querySelector('.basket');
    const myStorage = window.localStorage;
    let localStorageItems = myStorage.getItem('basket') ? JSON.parse(myStorage.getItem('basket')) : [];
    const cartTotals = document.querySelectorAll('.cart-totals__price');

    const cartNavItem = () => {
        basketDIV.innerHTML = '';
        let sum = 0;

        const basketCardTemplate = (item) => {
            return `
            <div class="card--basket">
                <img
                src="${item.slika}"
                alt="Card BG"
                class="card--basket__image"
                />
                <div class="card--basket__info">
                <h4 class="card--basket__title">
                    ${item.naziv}
                </h4>
                <p class="card--basket__category">${item.kategorija}</p>
                <h4 class="card--basket__price">${item.cena}RSD</h4>
                </div>
          </div>
            `
        };

        localStorageItems.forEach(async(item, i) => {
            sum += item.cena;
            basketDIV.innerHTML += basketCardTemplate(item);
        });

        setTimeout(() => {
            basketDIV.innerHTML +=
            `
            <div class="basket__menu">
                <h3 class="basket__total">Total: ${sum}.00RSD</h3>
                <button
                    class="button card--basket__button js-goto-basket"
                    type="submit"
                >
                Go to checkout
                </button>
            </div>
            `
        }, 1000);
    }

    if (window.location.pathname.includes('/basketpage.html')) {
        let sum = 0;
        const basketTable = document.querySelector('.table');
        basketTable.innerHTML = '';
        const tableHeadingRow = document.createElement('tr');
        tableHeadingRow.classList.add('table--cart__row');
        const addTableHeading = () => {
            return `
            <td class="table--cart__data table--cart__heading">
              &nbsp;
            </td>
            <td class="table--cart__data table--cart__heading">
              Product
            </td>
            <td class="table--cart__data table--cart__heading">
              Price
            </td>
            <td class="table--cart__data table--cart__heading">
              Quantity
            </td>
            <td class="table--cart__data table--cart__heading">
              Subtotal
            </td>
            <td class="table--cart__data table--cart__heading">
              &nbsp;
            </td>
            `;
        }
        tableHeadingRow.innerHTML = addTableHeading();
        basketTable.append(tableHeadingRow);
        const createTBody = document.createElement('tbody');
        const addItemToTheTable = (item) => {
            return `
            <td class="table--cart__data">
              <img
                src="${item.slika}"
                class="table--cart__item-image"
                alt=""
              />
            </td>
            <td class="table--cart__data">
              <span class="table--cart-item-title">
                ${item.naziv}
              </span>
            </td>
            <td class="table--cart__data">
              <span class="table--cart__item-price">${item.cena}</span>
            </td>
            <td class="table--cart__data">
              <button class="button button--quantity">
                <i class="fas fa-minus-square"></i>
              </button>
              <span class="table--cart__quantity">1</span>
              <button class="button button--quantity">
                <i class="fas fa-plus-square"></i>
              </button>
            </td>
            <td class="table--cart__data">
              <span class="table--cart__item--subtotal">${item.cena}</span>
            </td>
            <td class="table--cart__data">
              <button class="button table--cart__data-trash">
                <i class="fas fa-trash"></i>
              </button>
            </td>
            `
        };

        localStorageItems.forEach((item, i) => {
            const tableRow = document.createElement('tr');
            tableRow.classList.add('table--cart__row');
            tableRow.setAttribute('data-id', item.id);
            tableRow.innerHTML = addItemToTheTable(item);
            createTBody.appendChild(tableRow);
            sum = sum + item.cena;
        });
        basketTable.appendChild(createTBody);
        cartTotals.forEach(total => total.textContent = sum + ",00 RSD");

        const dataTrash = document.querySelectorAll('.table--cart__data-trash');

        dataTrash.forEach(data => {
            data.addEventListener('click', () => {
                const modal = document.querySelector('.js-modal-delete');
                modal.classList.toggle('modal--active');
                const jsButton = document.querySelector('.js-delete-button');
                jsButton.addEventListener('click', () => {
                    modal.classList.remove('modal--active');
                    localStorageItems = removeSpecifiedElementFromTheLocalStorage(localStorageItems, data.parentElement.parentElement.getAttribute('data-id'));
                    myStorage.setItem('basket', JSON.stringify(localStorageItems));
                    Basket();
                });
            });
        });
    }


    const removeSpecifiedElementFromTheLocalStorage = (arr, value) => {
        return arr.filter(function(ele){
            return ele.id != value;
        });
    }

    basketDIV.addEventListener('click', () => {
        window.location.href = '/basketpage.html';
    });
    cartNavItem();
};

export default Basket;