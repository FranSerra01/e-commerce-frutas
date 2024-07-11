/* E-COMMERCE */

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const total = document.getElementById('total');
    let totalValue = 0;

    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.getAttribute('data-price'));

            const cartItem = document.createElement('li');
            cartItem.classList.add('cartItem');
            cartItem.innerHTML = `${productName} - $${productPrice.toFixed(2)} <button class="removeFromCart">Quitar</button>`;

            cartItems.appendChild(cartItem);

            totalValue += productPrice;
            total.textContent = totalValue.toFixed(2);
            
            cartItem.querySelector('.removeFromCart').addEventListener('click', () => {
                cartItems.removeChild(cartItem);
                totalValue -= productPrice;
                total.textContent = totalValue.toFixed(2);

                let newTotal = 0;
                document.querySelectorAll('.cartItem').forEach(item => {
                    const itemPrice = parseFloat(item.textContent.split('- $')[1]);
                    newTotal += itemPrice;
                });
                total.textContent = newTotal.toFixed(2);
            });
        });
    });
});