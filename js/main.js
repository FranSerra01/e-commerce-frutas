document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const total = document.getElementById('total');
    const searchInput = document.getElementById('search');
    const emptyCartButton = document.getElementById('emptyCart');
    const loadingIndicator = document.getElementById('loading');
    let totalValue = 0;
    let products = [];

    const loadProducts = async () => {
        try {
            loadingIndicator.classList.add('show');
            const response = await fetch('./productos.json');
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Hubo un problema al cargar los productos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudieron cargar los productos. Inténtalo de nuevo más tarde.',
            });
        } finally {
            loadingIndicator.classList.remove('show');
        }
    };

    const loadCartFromStorage = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        storedCart.forEach(product => addToCart(product, false));
    };

    const saveCartToStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const displayProducts = (productList) => {
        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';
        productList.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.setAttribute('data-price', product.price);
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

    const addToCart = (product, showAlert = true) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cartItem');
        cartItem.innerHTML = `${product.name} - $${product.price.toFixed(2)} <button class="removeFromCart">Quitar</button>`;
        cartItems.appendChild(cartItem);

        totalValue += product.price;
        total.textContent = totalValue.toFixed(2);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        saveCartToStorage(cart);

        if (showAlert) {
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                text: `${product.name} se ha agregado al carrito.`,
                showConfirmButton: false,
                timer: 1500
            });
        }

        cartItem.querySelector('.removeFromCart').addEventListener('click', () => {
            removeFromCart(cartItem, product.price, product);
        });
    };

    const removeFromCart = (cartItem, price, product) => {
        cartItems.removeChild(cartItem);
        totalValue -= price;
        total.textContent = totalValue.toFixed(2);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== product.id);
        saveCartToStorage(cart);

        Swal.fire({
            icon: 'info',
            title: 'Producto eliminado',
            text: `${product.name} se ha eliminado del carrito.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const filterProducts = () => {
        const searchValue = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );
        displayProducts(filteredProducts);
    };

    const emptyCart = () => {
        cartItems.innerHTML = '';
        totalValue = 0;
        total.textContent = '0.00';
        localStorage.removeItem('cart');

        Swal.fire({
            icon: 'warning',
            title: 'Carrito vaciado',
            text: 'Todos los productos han sido eliminados del carrito.',
            showConfirmButton: false,
            timer: 1500
        });
    };

    searchInput.addEventListener('input', filterProducts);
    emptyCartButton.addEventListener('click', emptyCart);

    loadProducts();  
    loadCartFromStorage();
});
