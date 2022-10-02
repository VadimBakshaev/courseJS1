"use strict";

const basket = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const totalPrice = document.querySelector('.basketTotalValue');
const cartCount = document.querySelector('.cartCount');

document.querySelector('.cartIcon').addEventListener('click', () => {
    basket.classList.toggle('hidden');
});

const cartItems = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (event.target.closest('button.addToCart')) {
        const item = event.target.closest('.featuredItem');
        const id = item.dataset.id;
        const name = item.dataset.name;
        const price = item.dataset.price;
        addToCart(id, name, price);
    }
});

function addToCart(id, name, price) {
    if (!(id in cartItems)) {
        cartItems[id] = { id, name, price, quantity: 0 };
        insertItemRow(id);
    }
    const itemRow = document.querySelector(`.basketRow[data-itemId="${id}"]`);
    itemRow.querySelector('.productCount').textContent
        = ++cartItems[id].quantity;
    itemRow.querySelector('.productTotalRow').textContent
        = price * cartItems[id].quantity;
    totalPrice.textContent
        = (Number(totalPrice.textContent)
            + Number(price)).toFixed(2);
    cartCount.textContent = ++cartCount.textContent;
}

function insertItemRow(itemId) {
    const row = `
    <div class="basketRow" data-itemId="${itemId}">
    <div>
        ${cartItems[itemId].name}
    </div>
    <div>
        <span class="productCount">0</span> шт.
    </div>
    <div>
        $${cartItems[itemId].price}
    </div>
    <div>
        $<span class="productTotalRow">0</span>    
    </div>
    </div>`;
    basketTotalEl.insertAdjacentHTML('beforebegin', row);
}

