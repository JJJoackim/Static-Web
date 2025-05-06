const menuToggle = document.getElementById('menu-toggle');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    header.classList.toggle('active');
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

AOS.init({
    duration: 1200, // animation duration
    once: true,     // only animate once per scroll
  });