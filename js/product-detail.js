document.addEventListener('DOMContentLoaded', function() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  if (!productId) {
    // Redirect to products page if no ID is provided
    window.location.href = 'products.html';
    return;
  }
  
  // Load product details
  loadProductDetails(productId);
  
  // Add event listeners for quantity buttons
  initQuantityButtons();
  
  // Add event listener for Add to Cart button
  document.getElementById('add-to-cart').addEventListener('click', function() {
    const quantity = parseInt(document.getElementById('quantity').value);
    addToCart(productId, quantity);
    
    // Show modal
    showAddToCartModal(productId, quantity);
  });
  
  // Add event listener for Add to Wishlist button
  document.getElementById('add-to-wishlist').addEventListener('click', function() {
    addToWishlist(productId);
  });
});

// Function to load product details
function loadProductDetails(productId) {
  const product = window.productData.getById(productId);
  
  if (!product) {
    // Redirect to products page if product not found
    window.location.href = 'products.html';
    return;
  }
  
  // Update page title
  document.title = `${product.name} - OutdoorGear`;
  
  // Update breadcrumb
  document.getElementById('product-name-breadcrumb').textContent = product.name;
  
  // Update product name
  document.getElementById('product-name').textContent = product.name;
  
  // Update product images
  const mainProductImage = document.getElementById('main-product-image');
  mainProductImage.src = product.images[0];
  mainProductImage.alt = product.name;
  
  // Update thumbnails
  const thumbnailsContainer = document.querySelector('.product-thumbnails');
  let thumbnailsHtml = '';
  
  product.images.forEach((image, index) => {
    thumbnailsHtml += `
      <div class="thumbnail-item ${index === 0 ? 'active' : ''}" data-image="${image}">
        <img src="${image}" alt="${product.name} - Image ${index + 1}" class="thumbnail-img">
      </div>
    `;
  });
  
  thumbnailsContainer.innerHTML = thumbnailsHtml;
  
  // Add click event to thumbnails
  document.querySelectorAll('.thumbnail-item').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Update main image
      mainProductImage.src = this.getAttribute('data-image');
      
      // Update active state
      document.querySelectorAll('.thumbnail-item').forEach(item => {
        item.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  // Update product rating
  const ratingContainer = document.getElementById('product-rating');
  ratingContainer.innerHTML = generateStarRating(product.rating);
  
  // Update review count
  document.getElementById('review-count').textContent = `${product.reviewCount} reviews`;
  
  // Update product price
  document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
  
  const productOriginalPrice = document.getElementById('product-original-price');
  const discountBadge = document.getElementById('discount-badge');
  
  if (product.originalPrice > product.price) {
    productOriginalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
    productOriginalPrice.style.display = 'inline';
    
    discountBadge.textContent = `${product.discount}% OFF`;
    discountBadge.style.display = 'inline';
  } else {
    productOriginalPrice.style.display = 'none';
    discountBadge.style.display = 'none';
  }
  
  // Update product description
  document.getElementById('product-description').textContent = product.description;
  
  // Update product variants
  const variantsContainer = document.getElementById('product-variants');
  
  if (Object.keys(product.variants).length > 0) {
    let variantsHtml = '';
    
    for (const [variantName, variantOptions] of Object.entries(product.variants)) {
      variantsHtml += `
        <div class="mb-3">
          <h5 class="variant-title">${variantName}</h5>
          <div class="variant-options">
            ${variantOptions.map((option, index) => `
              <div class="variant-option ${index === 0 ? 'active' : ''}" data-variant="${variantName.toLowerCase()}" data-value="${option}">
                ${option}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    variantsContainer.innerHTML = variantsHtml;
    
    // Add click event to variant options
    document.querySelectorAll('.variant-option').forEach(option => {
      option.addEventListener('click', function() {
        const variant = this.getAttribute('data-variant');
        
        // Update active state for this variant
        document.querySelectorAll(`.variant-option[data-variant="${variant}"]`).forEach(item => {
          item.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  } else {
    variantsContainer.style.display = 'none';
  }
  
  // Update stock status
  const stockStatus = document.getElementById('stock-status');
  
  if (product.stock > 0) {
    stockStatus.innerHTML = `<span class="in-stock"><i class="bi bi-check-circle-fill"></i> In Stock (${product.stock} available)</span>`;
  } else {
    stockStatus.innerHTML = `<span class="out-of-stock"><i class="bi bi-x-circle-fill"></i> Out of Stock</span>`;
    
    // Disable add to cart button
    document.getElementById('add-to-cart').disabled = true;
  }
  
  // Update product meta
  document.getElementById('product-sku').textContent = product.sku;
  document.getElementById('product-category').textContent = capitalizeFirstLetter(product.category);
  document.getElementById('product-tags').textContent = product.tags.join(', ');
  
  // Update specifications
  const specificationsContainer = document.getElementById('product-specifications');
  
  let specificationsHtml = '<table class="specifications-table">';
  
  for (const [specName, specValue] of Object.entries(product.specifications)) {
    specificationsHtml += `
      <tr>
        <th>${specName}</th>
        <td>${specValue}</td>
      </tr>
    `;
  }
  
  specificationsHtml += '</table>';
  specificationsContainer.innerHTML = specificationsHtml;
  
  // Load reviews
  loadProductReviews(productId);
  
  // Load related products
  loadRelatedProducts(productId, product.category);
  
  // Add to recently viewed
  addToRecentlyViewed(product);
  
  // Load recently viewed products
  loadRecentlyViewed(productId);
}

// Function to load product reviews
function loadProductReviews(productId) {
  const reviewsContainer = document.getElementById('product-reviews');
  const reviews = window.productData.getReviews(productId);
  
  if (reviews.length === 0) {
    reviewsContainer.innerHTML = `
      <div class="text-center py-4">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    `;
    return;
  }
  
  let reviewsHtml = '';
  
  reviews.forEach(review => {
    reviewsHtml += `
      <div class="review-item">
        <div class="review-header">
          <div class="reviewer-name">${review.name}</div>
          <div class="review-date">${formatDate(review.date)}</div>
        </div>
        <div class="review-rating">
          ${generateStarRating(review.rating)}
        </div>
        <h5 class="review-title">${review.title}</h5>
        <div class="review-content">${review.content}</div>
      </div>
    `;
  });
  
  reviewsContainer.innerHTML = reviewsHtml;
}

// Function to load related products
function loadRelatedProducts(productId, category) {
  const relatedProductsContainer = document.getElementById('related-products-container');
  const relatedProducts = window.productData.getRelated(productId, category, 4);
  
  if (relatedProducts.length === 0) {
    document.querySelector('.related-products').style.display = 'none';
    return;
  }
  
  let html = '';
  
  relatedProducts.forEach(product => {
    html += `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="product-card">
          <div class="product-img-container">
            <a href="product-detail.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" class="product-img">
            </a>
            
            ${product.discount > 0 ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
            ${product.isNew ? `<div class="product-badge" style="background-color: var(--accent);">NEW</div>` : ''}
          </div>
          
          <div class="product-info">
            <div class="product-category">${capitalizeFirstLetter(product.category)}</div>
            <h3 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            
            <div class="product-rating">
              ${generateStarRating(product.rating)}
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
  
  relatedProductsContainer.innerHTML = html;
  
  // Add event listeners to Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToCart(productId, 1);
    });
  });
}

// Function to load recently viewed products
function loadRecentlyViewed(currentProductId) {
  const recentlyViewedContainer = document.getElementById('recently-viewed-container');
  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
  // Filter out current product and limit to 4 items
  const filteredRecentlyViewed = recentlyViewed
    .filter(item => item.id !== currentProductId)
    .slice(0, 4);
  
  if (filteredRecentlyViewed.length === 0) {
    document.querySelector('.recently-viewed').style.display = 'none';
    return;
  }
  
  let html = '';
  
  filteredRecentlyViewed.forEach(item => {
    const product = window.productData.getById(item.id);
    
    if (!product) return;
    
    html += `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="product-card">
          <div class="product-img-container">
            <a href="product-detail.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" class="product-img">
            </a>
          </div>
          
          <div class="product-info">
            <div class="product-category">${capitalizeFirstLetter(product.category)}</div>
            <h3 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            
            <div class="product-rating">
              ${generateStarRating(product.rating)}
            </div>
            
            <div class="product-price">
              $${product.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  recentlyViewedContainer.innerHTML = html;
}

// Function to initialize quantity buttons
function initQuantityButtons() {
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const quantityInput = document.getElementById('quantity');
  
  decreaseBtn.addEventListener('click', function() {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
    }
  });
  
  increaseBtn.addEventListener('click', function() {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) {
      quantity++;
      quantityInput.value = quantity;
    }
  });
  
  quantityInput.addEventListener('change', function() {
    let quantity = parseInt(this.value);
    
    if (isNaN(quantity) || quantity < 1) {
      this.value = 1;
    } else if (quantity > 10) {
      this.value = 10;
    }
  });
}

// Function to show add to cart modal
function showAddToCartModal(productId, quantity) {
  const product = window.productData.getById(productId);
  
  // Update modal content
  document.getElementById('modal-product-image').src = product.image;
  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-product-quantity').textContent = quantity;
  
  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('addToCartModal'));
  modal.show();
}

// Helper function to add product to recently viewed
function addToRecentlyViewed(product) {
  // Get current recently viewed or initialize empty array
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
  // Check if product is already in recently viewed
  const existingItemIndex = recentlyViewed.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // Remove existing entry
    recentlyViewed.splice(existingItemIndex, 1);
  }
  
  // Add product to beginning of array
  recentlyViewed.unshift({
    id: product.id,
    timestamp: Date.now()
  });
  
  // Limit to 10 items
  if (recentlyViewed.length > 10) {
    recentlyViewed = recentlyViewed.slice(0, 10);
  }
  
  // Save to localStorage
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Helper function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper functions from home.js
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addToCart(productId, quantity) {
  // Get the product details
  const product = window.productData.getById(productId);
  if (!product) return;
  
  // Get selected variants if any
  const variants = {};
  document.querySelectorAll('.variant-option.active').forEach(option => {
    const variant = option.getAttribute('data-variant');
    const value = option.getAttribute('data-value');
    variants[variant] = value;
  });
  
  // Get current cart or initialize empty cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Generate a unique key for this product with its variants
  const variantKey = Object.keys(variants).length > 0 ? 
    JSON.stringify(variants) : '';
  
  // Check if product with same variants is already in cart
  const existingItemIndex = cart.findIndex(item => 
    item.id === productId && item.variantKey === variantKey
  );
  
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
      quantity: quantity,
      variants: variants,
      variantKey: variantKey
    });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count in header
  updateCartCount();
}

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
      image: product.image,
      addedAt: Date.now()
    });
    
    // Save updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Show success message
    showToast('Added to Wishlist', `${product.name} has been added to your wishlist.`, 'success');
    
    // Update wishlist icon
    const wishlistButton = document.getElementById('add-to-wishlist');
    wishlistButton.innerHTML = '<i class="bi bi-heart-fill"></i>';
    wishlistButton.classList.add('active');
  } else {
    // Remove from wishlist
    wishlist.splice(existingItemIndex, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Show info message
    showToast('Removed from Wishlist', `${product.name} has been removed from your wishlist.`, 'info');
    
    // Update wishlist icon
    const wishlistButton = document.getElementById('add-to-wishlist');
    wishlistButton.innerHTML = '<i class="bi bi-heart"></i>';
    wishlistButton.classList.remove('active');
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