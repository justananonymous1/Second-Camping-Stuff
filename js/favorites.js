document.addEventListener('DOMContentLoaded', function() {
  loadFavorites();
  initFavoritesActions();
});

function loadFavorites() {
  const favoritesGrid = document.getElementById('favorites-grid');
  const favoritesEmpty = document.getElementById('favorites-empty');
  const favoritesCount = document.getElementById('favorites-count');
  
  const favorites = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  favoritesCount.textContent = favorites.length;
  
  if (favorites.length === 0) {
    favoritesEmpty.style.display = 'block';
    favoritesGrid.style.display = 'none';
    return;
  }
  
  favoritesEmpty.style.display = 'none';
  favoritesGrid.style.display = 'flex';
  
  let html = '';
  
  favorites.forEach(item => {
    const product = window.productData.getById(item.id);
    if (!product) return;
    
    html += `
      <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
        <div class="favorites-item">
          <div class="favorites-item-image">
            <a href="product-detail.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}">
            </a>
            <button class="remove-favorite" data-product-id="${product.id}">
              <i class="bi bi-x"></i>
            </button>
          </div>
          
          <div class="favorites-item-info">
            <div class="favorites-item-category">${capitalizeFirstLetter(product.category)}</div>
            <h3 class="favorites-item-title">
              <a href="product-detail.html?id=${product.id}">${product.name}</a>
            </h3>
            
            <div class="favorites-item-rating">
              ${generateStarRating(product.rating)}
              <span class="ms-2">(${product.reviewCount})</span>
            </div>
            
            <div class="favorites-item-price">
              $${product.price.toFixed(2)}
              ${product.originalPrice > product.price ? `<span class="old-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            
            <div class="favorites-item-actions">
              <button class="btn btn-primary move-to-cart" data-product-id="${product.id}">
                <i class="bi bi-cart-plus"></i> Add to Cart
              </button>
              <button class="remove-from-favorites" data-product-id="${product.id}">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  favoritesGrid.innerHTML = html;
  
  document.querySelectorAll('.move-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToCart(productId, 1);
    });
  });
  
  document.querySelectorAll('.remove-favorite, .remove-from-favorites').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      removeFromFavorites(productId);
    });
  });
}

function initFavoritesActions() {
  const clearAllBtn = document.getElementById('clear-all-favorites');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to remove all items from your favorites?')) {
        localStorage.removeItem('wishlist');
        loadFavorites();
        showToast('Cleared', 'All items removed from favorites.', 'info');
      }
    });
  }
}

function removeFromFavorites(productId) {
  let favorites = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  const productIndex = favorites.findIndex(item => item.id === productId);
  if (productIndex !== -1) {
    const product = window.productData.getById(productId);
    favorites.splice(productIndex, 1);
    localStorage.setItem('wishlist', JSON.stringify(favorites));
    
    loadFavorites();
    showToast('Removed', `${product.name} removed from favorites.`, 'info');
  }
}

function addToCart(productId, quantity) {
  const product = window.productData.getById(productId);
  if (!product) return;
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  showToast('Added to Cart', `${product.name} has been added to your cart.`, 'success');
}

function generateStarRating(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="bi bi-star-fill"></i>';
  }
  
  if (halfStar) {
    stars += '<i class="bi bi-star-half"></i>';
  }
  
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="bi bi-star"></i>';
  }
  
  return stars;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showToast(title, message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  const toastId = 'toast-' + Date.now();
  
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'warning') icon = 'exclamation-triangle';
  if (type === 'error') icon = 'x-circle';
  
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
  
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
  toast.show();
  
  toastElement.addEventListener('hidden.bs.toast', function() {
    this.remove();
  });
}