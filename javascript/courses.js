const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    header.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Function to add product to the cart and redirect to the cart page
function addToCartAndRedirect(event, button) {
    event.preventDefault(); // Prevents the default anchor tag behavior (navigation)

    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = parseFloat(button.getAttribute('data-product-price'));
    
    // Create a product object
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1 // Default quantity is 1
    };
    
    // Get the cart from localStorage or create an empty cart if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    
    if (existingProductIndex > -1) {
        // If the product is already in the cart, just update the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If the product is not in the cart, add it
        cart.push(product);
    }
    
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to the cart page
    window.location.href = 'cart.html';
}

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

// Get filter elements
const categoryFilter = document.getElementById("categoryFilter");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");

// Attach change listeners
categoryFilter.addEventListener("change", applyFilters);
minPriceInput.addEventListener("input", applyFilters);
maxPriceInput.addEventListener("input", applyFilters);

function applyFilters() {
  const category = categoryFilter.value;
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const productCategory = product.getAttribute("data-category");
    const productPrice = parseFloat(product.getAttribute("data-price"));

    const categoryMatch = category === "all" || category === productCategory;
    const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;

    product.style.display = (categoryMatch && priceMatch) ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".rating").forEach(ratingDiv => {
      const productId = ratingDiv.getAttribute("data-product-id");
      const stars = ratingDiv.textContent.trim().split("");
      ratingDiv.innerHTML = "";
  
      stars.forEach((_, index) => {
        const star = document.createElement("span");
        star.innerText = "★";
        star.classList.add("star");
        star.dataset.index = index + 1;
        ratingDiv.appendChild(star);
      });
  
      const storedRating = localStorage.getItem("rating-" + productId);
      if (storedRating) highlightStars(ratingDiv, storedRating);
  
      ratingDiv.addEventListener("click", e => {
        if (e.target.classList.contains("star")) {
          const selectedRating = e.target.dataset.index;
          localStorage.setItem("rating-" + productId, selectedRating);
          highlightStars(ratingDiv, selectedRating);
        }
      });
    });
  
    function highlightStars(container, count) {
      container.querySelectorAll(".star").forEach((star, i) => {
        star.style.color = i < count ? "#FF914D" : "#ccc";
      });
    }
  });
  

