document.addEventListener('DOMContentLoaded', function() {
  // Load category products
  loadCategoryProducts('tents', 'tents-category');
  loadCategoryProducts('sleeping', 'sleeping-category');
  loadCategoryProducts('cooking', 'cooking-category');
  
  // Load featured products
  loadFeaturedProducts();
  
  // Initialize newsletter form
  initNewsletter();
});

// Function to load category products
function loadCategoryProducts(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const products = window.productData.getByCategory(category);
  
  // Only display up to 4 products per category
  const productsToShow = products.slice(0, 4);
  
  let html = '';
  
  productsToShow.forEach(product => {
    html += `
      <div class="col-md-6 col-lg-3">
        <div class="product-card">
          <div class="product-img-container">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            
            <div class="product-badges">
              ${product.isNew ? `<div class="product-badge new">NEW</div>` : ''}
              ${product.discount > 0 ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
            </div>
            
            <div class="product-actions">
              <a href="#" class="product-action-btn add-to-wishlist" data-product-id="${product.id}">
                <i class="bi bi-heart"></i>
              </a>
              <a href="product-detail.html?id=${product.id}" class="product-action-btn view-product">
                <i class="bi bi-eye"></i>
              </a>
            </div>
          </div>
          
          <div class="product-info">
            <div class="product-category">${capitalizeFirstLetter(product.category)}</div>
            <h3 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            
            <div class="product-rating">
              ${generateStarRating(product.rating)}
              <span class="ms-2">(${product.reviewCount})</span>
            </div>
            
            <div class="product-price">
              $${product.price.toFixed(2)}
              ${product.originalPrice > product.price ? `<span class="old-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            
            <button class="btn btn-outline-primary w-100 add-to-cart animate-hover" data-product-id="${product.id}">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Add event listeners
  initializeProductCardEvents(container);
}

// Function to load featured products
function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products-container');
  if (!featuredProductsContainer) return;
  
  const featuredProducts = window.productData.getFeatured();
  
  // Only display 4 featured products
  const productsToShow = featuredProducts.slice(0, 4);
  
  let html = '';
  
  productsToShow.forEach(product => {
    html += `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="product-card">
          <div class="product-img-container">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            
            <div class="product-badges">
              ${product.isNew ? `<div class="product-badge new">NEW</div>` : ''}
              ${product.discount > 0 ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
            </div>
            
            <div class="product-actions">
              <a href="#" class="product-action-btn add-to-wishlist" data-product-id="${product.id}">
                <i class="bi bi-heart"></i>
              </a>
              <a href="product-detail.html?id=${product.id}" class="product-action-btn view-product">
                <i class="bi bi-eye"></i>
              </a>
            </div>
          </div>
          
          <div class="product-info">
            <div class="product-category">${capitalizeFirstLetter(product.category)}</div>
            <h3 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            
            <div class="product-rating">
              ${generateStarRating(product.rating)}
              <span class="ms-2">(${product.reviewCount})</span>
            </div>
            
            <div class="product-price">
              $${product.price.toFixed(2)}
              ${product.originalPrice > product.price ? `<span class="old-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            
            <button class="btn btn-outline-primary w-100 add-to-cart animate-hover" data-product-id="${product.id}">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  featuredProductsContainer.innerHTML = html;
  
  // Add event listeners
  initializeProductCardEvents(featuredProductsContainer);
}

// Function to initialize product card events
function initializeProductCardEvents(container) {
  // Add event listeners to Add to Cart buttons
  container.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToCart(productId, 1);
    });
  });
  
  // Add event listeners to Add to Wishlist buttons
  container.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToWishlist(productId);
    });
  });
}

// Function to initialize newsletter form
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email) {
      // In a real app, you would send this to your backend
      // For now, just show a success message
      emailInput.value = '';
      
      // Create a toast notification
      showToast('Success!', 'You have been subscribed to our newsletter.', 'success');
    }
  });
}

// Helper function to generate star rating HTML
function generateStarRating(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="bi bi-star-fill"></i>';
  }
  
  // Add half star if needed
  if (halfStar) {
    stars += '<i class="bi bi-star-half"></i>';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="bi bi-star"></i>';
  }
  
  return stars;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to add a product to cart
function addToCart(productId, quantity) {
  // Get the product details
  const product = window.productData.getById(productId);
  if (!product) return;
  
  // Get current cart or initialize empty cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product is already in cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex !== -1) {
    // Update quantity if product is already in cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count in header
  updateCartCount();
  
  // Show success message
  showToast('Added to Cart', `${product.name} has been added to your cart.`, 'success');
}

// Function to add a product to wishlist
function addToWishlist(productId) {
  // Get the product details
  const product = window.productData.getById(productId);
  if (!product) return;
  
  // Get current wishlist or initialize empty wishlist
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  // Check if product is already in wishlist
  const existingItemIndex = wishlist.findIndex(item => item.id === productId);
  
  if (existingItemIndex === -1) {
    // Add new item to wishlist
    wishlist.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // Save updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Show success message
    showToast('Added to Wishlist', `${product.name} has been added to your wishlist.`, 'success');
  } else {
    // Show info message if already in wishlist
    showToast('Already in Wishlist', `${product.name} is already in your wishlist.`, 'info');
  }
}

// Function to show toast notification
function showToast(title, message, type = 'info') {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  // Create a unique ID for the toast
  const toastId = 'toast-' + Date.now();
  
  // Set the icon based on type
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'warning') icon = 'exclamation-triangle';
  if (type === 'error') icon = 'x-circle';
  
  // Create toast HTML
  const toastHtml = `
    <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <i class="bi bi-${icon} me-2 text-${type === 'info' ? 'primary' : type}"></i>
        <strong class="me-auto">${title}</strong>
        <small>Just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;
  
  // Add toast to container
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  
  // Initialize and show the toast
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
  toast.show();
  
  // Remove toast from DOM after it's hidden
  toastElement.addEventListener('hidden.bs.toast', function() {
    this.remove();
  });
}