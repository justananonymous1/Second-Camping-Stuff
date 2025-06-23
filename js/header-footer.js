function loadHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  
  header.innerHTML = `
    <nav class="navbar navbar-expand-lg site-header py-3">
      <div class="container">
        <a class="header-logo" href="index.html">
          <i class="bi bi-tree"></i> OutdoorGear
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="shopDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Shop
              </a>
              <ul class="dropdown-menu" aria-labelledby="shopDropdown">
                <li><a class="dropdown-item" href="products.html">All Products</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="products.html?category=tents">Tents</a></li>
                <li><a class="dropdown-item" href="products.html?category=sleeping">Sleeping Gear</a></li>
                <li><a class="dropdown-item" href="products.html?category=cooking">Cooking Gear</a></li>
                <li><a class="dropdown-item" href="products.html?category=backpacks">Backpacks</a></li>
                <li><a class="dropdown-item" href="products.html?category=accessories">Accessories</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about.html">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">Contact</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person"></i> Profile
              </a>
              <ul class="dropdown-menu" aria-labelledby="profileDropdown">
                <li><a class="dropdown-item" href="profile.html">My Account</a></li>
                <li><a class="dropdown-item" href="profile.html#orders">My Orders</a></li>
                <li><a class="dropdown-item" href="favorites.html">Wishlist</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
              </ul>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <div class="header-search me-3">
              <form class="d-flex" id="search-form">
                <input type="text" class="form-control" id="search-input" placeholder="Search products..." aria-label="Search">
                <button class="btn btn-outline-secondary" type="submit">
                  <i class="bi bi-search"></i>
                </button>
              </form>
            </div>
            <div class="header-icons d-flex">
              <a href="favorites.html" class="header-icon me-3 position-relative">
                <i class="bi bi-heart"></i>
                <span class="cart-count" id="favorites-count">0</span>
              </a>
              <a href="cart.html" class="header-icon position-relative">
                <i class="bi bi-cart"></i>
                <span class="cart-count" id="cart-count">0</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
  
  updateCartCount();
  updateFavoritesCount();
  initializeSearch();
}

function loadFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  
  footer.innerHTML = `
    <div class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 class="footer-title">OutdoorGear</h5>
            <p>Premium camping equipment for unforgettable outdoor experiences.</p>
            <div class="footer-social mt-4">
              <a href="#" class="footer-social-icon"><i class="bi bi-facebook"></i></a>
              <a href="#" class="footer-social-icon"><i class="bi bi-instagram"></i></a>
              <a href="#" class="footer-social-icon"><i class="bi bi-twitter"></i></a>
              <a href="#" class="footer-social-icon"><i class="bi bi-youtube"></i></a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 class="footer-title">Shop</h5>
            <ul class="footer-links">
              <li><a href="products.html?category=tents">Tents</a></li>
              <li><a href="products.html?category=sleeping">Sleeping Gear</a></li>
              <li><a href="products.html?category=cooking">Cooking Gear</a></li>
              <li><a href="products.html?category=backpacks">Backpacks</a></li>
              <li><a href="products.html?category=accessories">Accessories</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 class="footer-title">Information</h5>
            <ul class="footer-links">
              <li><a href="about.html">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="footer-title">Customer Service</h5>
            <ul class="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Warranty Information</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom text-center">
          <p>&copy; 2025 OutdoorGear. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (!cartCountElement) return;
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  cartCountElement.textContent = itemCount;
  
  // Show/hide badge based on count
  if (itemCount > 0) {
    cartCountElement.style.display = 'flex';
  } else {
    cartCountElement.style.display = 'none';
  }
}

function updateFavoritesCount() {
  const favoritesCountElement = document.getElementById('favorites-count');
  if (!favoritesCountElement) return;
  
  const favorites = JSON.parse(localStorage.getItem('wishlist')) || [];
  favoritesCountElement.textContent = favorites.length;
  
  // Show/hide badge based on count
  if (favorites.length > 0) {
    favoritesCountElement.style.display = 'flex';
  } else {
    favoritesCountElement.style.display = 'none';
  }
}

function initializeSearch() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      
      if (searchTerm) {
        // Redirect to products page with search parameter
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
      }
    });
  }
}

function logout() {
  // Clear user data
  localStorage.removeItem('cart');
  localStorage.removeItem('wishlist');
  localStorage.removeItem('userProfile');
  
  // Show logout message
  alert('You have been logged out successfully.');
  
  // Redirect to home page
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  loadHeader();
  loadFooter();
  
  // Update counts when storage changes
  window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
      updateCartCount();
    }
    if (e.key === 'wishlist') {
      updateFavoritesCount();
    }
  });
  
  // Update counts when page becomes visible (for same-tab updates)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      updateCartCount();
      updateFavoritesCount();
    }
  });
});