// --- Menu Toggle Functionality ---
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

// Event listener to toggle menu visibility
menuToggle.addEventListener('click', () => {
    header.classList.toggle('active');  // Toggle active class on header
    document.body.classList.toggle('menu-open');  // Toggle open state on body
});

// --- Slideshow Functionality ---
let slideIndex = 0;

// Function to show slides (auto change every 3 seconds)
function showSlides() {
    let slides = document.querySelectorAll('.carousel-item');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  // Hide all slides
    }
    slideIndex++;  // Increment slide index
    if (slideIndex > slides.length) {
        slideIndex = 1;  // Loop back to the first slide
    }    
    slides[slideIndex - 1].style.display = "block";  // Show current slide
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Function to manually move to a specific slide
function moveSlide(n) {
    slideIndex += n;  // Increment slide index by n (forward/backward)
    if (slideIndex > document.querySelectorAll('.carousel-item').length) {
        slideIndex = 1;  // Loop back to the first slide
    }
    if (slideIndex < 1) {
        slideIndex = document.querySelectorAll('.carousel-item').length;  // Loop to last slide
    }
    updateCarousel();
}

// Function to update the carousel display
function updateCarousel() {
    let slides = document.querySelectorAll('.carousel-item');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  // Hide all slides
    }
    slides[slideIndex - 1].style.display = "block";  // Show current slide
}

// Initialize slideshow on page load
showSlides();

// --- Search Functionality ---
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const clearButton = document.querySelector('.clear-button');
    const noResultsMessage = document.getElementById('no-results-message');

    // Function to normalize search input and product names (lowercase and remove spaces)
    function normalize(str) {
        return str.toLowerCase().replace(/\s+/g, '');
    }

    // Function to search products based on user input
    function searchProducts() {
        const searchTerm = normalize(searchInput.value.trim());  // Get and normalize search term
        const products = document.querySelectorAll('.product-grid .product');  // Get all product elements

        let anyVisible = false;

        // Loop through all products to check if they match the search term
        products.forEach(product => {
            const productName = normalize(product.querySelector('h3')?.textContent.trim() || '');  // Get product name

            if (productName.includes(searchTerm)) {
                product.style.display = 'block';  // Show product if it matches
                anyVisible = true;
            } else {
                product.style.display = 'none';  // Hide product if it doesn't match
            }
        });

        // Show or hide the 'no results' message
        if (noResultsMessage) {
            noResultsMessage.style.display = anyVisible ? 'none' : 'block';
        }

        // Show or hide the clear button based on search input
        if (clearButton) {
            clearButton.style.display = searchInput.value.trim().length > 0 ? 'inline' : 'none';
        }
    }

    // Event listener for real-time search while typing
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }

    // Event listener for clearing search input
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            searchInput.value = '';  // Clear the search input
            clearButton.style.display = 'none';  // Hide clear button

            const products = document.querySelectorAll('.product-grid .product');
            products.forEach(product => {
                product.style.display = 'block';  // Show all products again
            });

            if (noResultsMessage) {
                noResultsMessage.style.display = 'none';  // Hide 'no results' message
            }
        });
    }
});

// --- Particles Animation Script for Header ---
function createParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;  // Exit if canvas doesn't exist

    const ctx = canvas.getContext('2d');
    const particles = [];

    canvas.width = 100;
    canvas.height = 60;

    // Generate particles with random positions, size, and velocity
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 1,
            dy: (Math.random() - 0.5) * 1
        });
    }

    // Animation function to move particles around
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas for new frame

        // Update particle position and bounce off edges
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);  // Draw particle
            ctx.fillStyle = '#FF914D';  // Particle color (orange)
            ctx.fill();
        });

        requestAnimationFrame(animate);  // Call animate function again for next frame
    }

    animate();  // Start animation
}

// Initialize particles animation on page load
document.addEventListener('DOMContentLoaded', function() {
    createParticles('particles-left');  // Create particles for left canvas
    createParticles('particles-right');  // Create particles for right canvas
});

// --- Floating Icons Random Movement ---
document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.floating-icon');

    // Random movement for each floating icon
    icons.forEach(icon => {
        setInterval(() => {
            const randomX = (Math.random() * 20) - 10;  // Random movement along X-axis (-10px to +10px)
            const randomY = (Math.random() * -20);       // Random movement along Y-axis (up, -20px to 0px)
            const randomScale = 1 + (Math.random() * 0.1); // Random scaling between 1 and 1.1
            icon.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;  // Apply transformation
        }, 3000 + Math.random() * 2000); // Every 3-5 seconds, move randomly
    });
});

// --- Horizontal Product Carousel Functionality with Auto Scroll ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!track || !prevBtn || !nextBtn) return;

    let index = 0;
    const total = track.children.length;

    function updateCarousel() {
        const width = window.innerWidth;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % total;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + total) % total;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);

    // Auto-scroll every 4 seconds
    setInterval(() => {
        index = (index + 1) % total;
        updateCarousel();
    }, 4000);

    updateCarousel(); // Initial position
});
