const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    header.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// --- Search functionality ---
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const clearButton = document.querySelector('.clear-button');
    const noResultsMessage = document.getElementById('no-results-message');

    function normalize(str) {
        return str.toLowerCase().replace(/\s+/g, '');
    }

    function searchProducts() {
        const searchTerm = normalize(searchInput.value.trim());
        const products = document.querySelectorAll('.product-grid animation-container' + '.product');

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
        clearButton.addEventListener('click', function() {
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
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent actual form submission

    // show popup
    const popup = document.getElementById('login-popup');
    popup.style.display = 'block';

    // hide popup after 2.5 seconds
    setTimeout(() => {
        popup.style.display = 'none';
        // optional: redirect after login
        // window.location.href = 'index.html';
    }, 2500);
});
