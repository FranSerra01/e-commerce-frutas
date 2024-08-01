/* E-COMMERCE */

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const total = document.getElementById('total');
    const searchInput = document.getElementById('search');
    let totalValue = 0;

    const products = [
        { id: 1, name: 'Banana', price: 10.00, img: './img/banana.jpg' },
        { id: 2, name: 'Manzana', price: 15.00, img: './img/apple.jpg' },
        { id: 3, name: 'Naranja', price: 25.00, img: './img/orange.jpg' },
        { id: 4, name: 'Kiwi', price: 25.00, img: './img/kiwi.jpg' },
        { id: 5, name: 'Anana', price: 50.00, img: './img/pineapple.jpg' },
        { id: 6, name: 'Mango', price: 40.00, img: './img/mango.jpg' },
        { id: 7, name: 'Pomelo', price: 30.00, img: './img/grapefruit.jpg' },
        { id: 8, name: 'Frutilla', price: 3.00, img: './img/strawberry.jpg' },
        { id: 9, name: 'Pera', price: 3.00, img: './img/pear.jpg' },
    ];

    const displayProducts = (productList) => {
        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';
        productList.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.setAttribute('dataPrice', product.price);
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Precio: $${product.price.toFixed(2)}</p>
                <button class="addToCart">Agregar al Carrito</button>
            `;
            productsContainer.appendChild(productDiv);

            productDiv.querySelector('.addToCart').addEventListener('click', () => {
                addToCart(product);
            });
        });
    };

    const addToCart = (product) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cartItem');
        cartItem.innerHTML = `${product.name} - $${product.price.toFixed(2)} <button class="removeFromCart">Quitar</button>`;
        cartItems.appendChild(cartItem);

        totalValue += product.price;
        total.textContent = totalValue.toFixed(2);

        cartItem.querySelector('.removeFromCart').addEventListener('click', () => {
            removeFromCart(cartItem, product.price);
        });
    };

    const removeFromCart = (cartItem, price) => {
        cartItems.removeChild(cartItem);
        totalValue -= price;
        total.textContent = totalValue.toFixed(2);
    };

    const filterProducts = () => {
        const searchValue = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );
        displayProducts(filteredProducts);
    };

    searchInput.addEventListener('input', filterProducts);

    displayProducts(products);
});