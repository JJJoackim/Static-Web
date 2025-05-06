// --- Menu Toggle Functionality ---
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

// Event listener to toggle menu visibility
menuToggle.addEventListener('click', () => {
    header.classList.toggle('active');  // Toggle active class on header
    document.body.classList.toggle('menu-open');  // Toggle open state on body
});

// --- Update Cart Display ---
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    if (cartItemsContainer && totalPriceElement) {
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
            <div class="cart-item-details">
                <span class="item-name">${item.name}</span>
            </div>
            <div class="cart-quantity-controls">
                <input type="number" value="${item.quantity}" data-product-id="${item.id}" class="quantity-input" min="1">
                <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-button" data-product-id="${item.id}">Remove</button>
            </div>
        `;
            cartItemsContainer.appendChild(itemElement);
        });

        updateCartTotal();

        // Toggle empty cart message and totals
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItemsContainer.style.display = 'none';
            document.getElementById('checkout-button').style.display = 'none';
            document.getElementById('cart-total').style.display = 'none';
            document.getElementById('shipping-fee').style.display = 'none';
            document.getElementById('grand-total').style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            cartItemsContainer.style.display = 'block';
            document.getElementById('checkout-button').style.display = 'block';
            document.getElementById('cart-total').style.display = 'block';
            document.getElementById('shipping-fee').style.display = 'block';
            document.getElementById('grand-total').style.display = 'block';
        }
    }

    if (cartCountElement) {
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (itemCount > 0) {
            cartCountElement.textContent = itemCount;
            cartCountElement.style.display = 'inline-block';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
}



// --- Update Quantity ---
function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (newQuantity <= 0) {
            cart.splice(productIndex, 1);
        } else {
            cart[productIndex].quantity = newQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    updateCart();
}

// --- Remove Item from Cart ---
function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => parseInt(item.id) !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// --- Listen to Input Changes ---
document.addEventListener('input', function(event) {
    if (event.target.classList.contains('quantity-input')) {
        const productId = parseInt(event.target.getAttribute('data-product-id'));
        let newQuantity = parseInt(event.target.value);

        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
            event.target.value = 1;
        }

        updateQuantity(productId, newQuantity);
    }
});

// --- Listen to Button Clicks ---
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-button')) {
        const productId = parseInt(event.target.getAttribute('data-product-id'));
        removeItemFromCart(productId);
    }

    if (event.target.classList.contains('increase')) {
        const productId = parseInt(event.target.getAttribute('data-product-id'));
        const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
        input.value = parseInt(input.value) + 1;
        updateQuantity(productId, parseInt(input.value));
    }

    if (event.target.classList.contains('decrease')) {
        const productId = parseInt(event.target.getAttribute('data-product-id'));
        const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            updateQuantity(productId, parseInt(input.value));
        }
    }
});

// --- Initialize Cart on Page Load ---
window.addEventListener('load', function() {
    updateCart();
});

document.addEventListener('DOMContentLoaded', function () {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const clearButton = document.querySelector('.clear-button');
    const noResultsMessage = document.getElementById('no-results-message');

    function normalize(str) {
        return str.toLowerCase().replace(/\s+/g, '');
    }

    function searchProducts() {
        const searchTerm = normalize(searchInput.value.trim());
        const products = document.querySelectorAll('.product-grid .product');

        let anyVisible = false;

        products.forEach(product => {
            const productName = normalize(product.querySelector('h3')?.textContent.trim() || '');

            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
                anyVisible = true;
            } else {
                product.style.display = 'none';
            }
        });

        if (noResultsMessage) {
            noResultsMessage.style.display = anyVisible ? 'none' : 'block';
        }

        if (clearButton) {
            clearButton.style.display = searchInput.value.trim().length > 0 ? 'inline' : 'none';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }

    if (clearButton) {
        clearButton.addEventListener('click', function () {
            searchInput.value = '';
            clearButton.style.display = 'none';

            const products = document.querySelectorAll('.product-grid .product');
            products.forEach(product => {
                product.style.display = 'block';
            });

            if (noResultsMessage) {
                noResultsMessage.style.display = 'none';
            }
        });
    }

    // Product dropdown toggle
    const productItem = document.querySelector(".products");
    if (productItem) {
        productItem.addEventListener("click", function (e) {
            e.stopPropagation();
            this.classList.toggle("active");
        });

        document.addEventListener("click", function (e) {
            if (!productItem.contains(e.target)) {
                productItem.classList.remove("active");
            }
        });
    }
});


function updateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });

    const shipping = 5.00;
    const grandTotal = total + shipping;

    document.getElementById("total-price").innerText = total.toFixed(2);
    document.getElementById("shipping-price").innerText = shipping.toFixed(2);
    document.getElementById("grand-total-price").innerText = grandTotal.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function () {
    const checkoutBtn = document.getElementById('checkout-button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            alert('Thank you! Your checkout request has been received.');
        });
    }
});
