document.addEventListener('DOMContentLoaded', function() {
  // Load products
  loadProducts();
  
  // Initialize filters
  initFilters();
  
  // Initialize sorting
  initSorting();
  
  // Check for URL parameters
  checkUrlParameters();
});

// Function to load products
function loadProducts(filters = {}, sort = 'featured', page = 1) {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) return;
  
  // Get all products
  let products = window.productData.getAll();
  
  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Apply category filter
  if (filters.categories && filters.categories.length > 0) {
    products = products.filter(product => filters.categories.includes(product.category));
  }
  
  // Apply price filter
  if (filters.priceRange) {
    products = products.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );
  }
  
  // Apply rating filter
  if (filters.ratings && filters.ratings.length > 0) {
    // Get the minimum rating from the selected ratings
    const minRating = Math.min(...filters.ratings);
    products = products.filter(product => product.rating >= minRating);
  }
  
  // Sort products
  sortProducts(products, sort);
  
  // Update product count
  const productCountElement = document.getElementById('product-count');
  if (productCountElement) {
    productCountElement.textContent = products.length;
  }
  
  // Pagination
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  // Generate products HTML
  let html = '';
  
  if (paginatedProducts.length === 0) {
    html = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-search" style="font-size: 3rem; color: var(--gray-400);"></i>
        <h3 class="mt-3">No products found</h3>
        <p class="text-muted">Try adjusting your filters or search criteria</p>
        <button id="reset-all-filters" class="btn btn-primary mt-3">Reset All Filters</button>
      </div>
    `;
  } else {
    paginatedProducts.forEach(product => {
      html += `
        <div class="col-md-6 col-lg-3 mb-4">
          <div class="product-card">
            <div class="product-img-container">
              <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-img">
              </a>
              
              ${product.discount > 0 ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
              ${product.isNew ? `<div class="product-badge" style="background-color: var(--accent);">NEW</div>` : ''}
              
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
  }
  
  productsContainer.innerHTML = html;
  
  // Generate pagination
  generatePagination(page, totalPages);
  
  // Add event listeners to Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToCart(productId, 1);
    });
  });
  
  // Add event listeners to Add to Wishlist buttons
  document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToWishlist(productId);
    });
  });
  
  // Add event listener to Reset All Filters button
  const resetAllFiltersBtn = document.getElementById('reset-all-filters');
  if (resetAllFiltersBtn) {
    resetAllFiltersBtn.addEventListener('click', function() {
      resetAllFilters();
    });
  }
}

// Function to initialize filters
function initFilters() {
  const applyFiltersBtn = document.getElementById('apply-filters');
  const resetFiltersBtn = document.getElementById('reset-filters');
  const priceRange = document.getElementById('price-range');
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  
  // Update price range display
  if (priceRange && priceMin && priceMax) {
    priceMin.textContent = '0';
    priceMax.textContent = priceRange.value;
    
    priceRange.addEventListener('input', function() {
      priceMax.textContent = this.value;
    });
  }
  
  // Apply filters
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', function() {
      const filters = getFilters();
      const sort = document.getElementById('sort-products').value;
      loadProducts(filters, sort, 1);
    });
  }
  
  // Reset filters
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', function() {
      resetAllFilters();
    });
  }
}

// Function to initialize sorting
function initSorting() {
  const sortSelect = document.getElementById('sort-products');
  if (!sortSelect) return;
  
  sortSelect.addEventListener('change', function() {
    const filters = getFilters();
    loadProducts(filters, this.value, 1);
  });
}

// Function to get current filters
function getFilters() {
  const filters = {};
  
  // Get search parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('search');
  if (searchTerm) {
    filters.search = searchTerm;
  }
  
  // Get category filters
  const categoryCheckboxes = document.querySelectorAll('.filter-category:checked');
  if (categoryCheckboxes.length > 0) {
    filters.categories = Array.from(categoryCheckboxes).map(checkbox => checkbox.value);
  }
  
  // Get price range
  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    filters.priceRange = {
      min: 0,
      max: parseInt(priceRange.value)
    };
  }
  
  // Get rating filters
  const ratingCheckboxes = document.querySelectorAll('.filter-rating:checked');
  if (ratingCheckboxes.length > 0) {
    filters.ratings = Array.from(ratingCheckboxes).map(checkbox => parseInt(checkbox.value));
  }
  
  return filters;
}

// Function to reset all filters
function resetAllFilters() {
  // Reset category checkboxes
  document.querySelectorAll('.filter-category').forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Reset price range
  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    priceRange.value = 500;
    const priceMax = document.getElementById('price-max');
    if (priceMax) {
      priceMax.textContent = '500';
    }
  }
  
  // Reset rating checkboxes
  document.querySelectorAll('.filter-rating').forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Reset sort
  const sortSelect = document.getElementById('sort-products');
  if (sortSelect) {
    sortSelect.value = 'featured';
  }
  
  // Clear URL parameters
  const url = new URL(window.location);
  url.searchParams.delete('search');
  url.searchParams.delete('category');
  window.history.replaceState({}, '', url);
  
  // Load all products
  loadProducts();
}

// Function to sort products
function sortProducts(products, sortType) {
  switch (sortType) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      // For demo purposes, we'll consider "new" products first, then by id (higher = newer)
      products.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return b.id - a.id;
      });
      break;
    case 'featured':
    default:
      // Sort featured products first, then by rating
      products.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.rating - a.rating;
      });
      break;
  }
}

// Function to generate pagination
function generatePagination(currentPage, totalPages) {
  const paginationElement = document.getElementById('pagination');
  if (!paginationElement) return;
  
  if (totalPages <= 1) {
    paginationElement.innerHTML = '';
    return;
  }
  
  let html = '';
  
  // Previous button
  html += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `;
  }
  
  // Next button
  html += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;
  
  paginationElement.innerHTML = html;
  
  // Add event listeners to pagination links
  document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (this.parentElement.classList.contains('disabled')) return;
      
      const page = parseInt(this.getAttribute('data-page'));
      const filters = getFilters();
      const sort = document.getElementById('sort-products').value;
      
      loadProducts(filters, sort, page);
      
      // Scroll to top of products
      document.querySelector('.products-main').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Function to check URL parameters for category and search
function checkUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const searchTerm = urlParams.get('search');
  
  // Handle category filter
  if (category) {
    const categoryCheckbox = document.getElementById(`category-${category}`);
    if (categoryCheckbox) {
      categoryCheckbox.checked = true;
    }
  }
  
  // Handle search term
  if (searchTerm) {
    // Update search input if it exists
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = searchTerm;
    }
    
    // Show search results message
    const productCountElement = document.getElementById('product-count');
    if (productCountElement && productCountElement.parentElement) {
      const searchMessage = document.createElement('p');
      searchMessage.className = 'text-muted mb-2';
      searchMessage.textContent = `Search results for "${searchTerm}"`;
      productCountElement.parentElement.insertBefore(searchMessage, productCountElement);
    }
  }
  
  // Apply filters if any URL parameters exist
  if (category || searchTerm) {
    const filters = getFilters();
    loadProducts(filters, 'featured', 1);
  }
}

// Helper functions
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
    
    // Update favorites count
    updateFavoritesCount();
    
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