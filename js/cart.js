document.addEventListener('DOMContentLoaded', function() {
  // Load cart
  loadCart();
  
  // Check if we're on the cart page
  if (document.getElementById('cart-content')) {
    // Initialize coupon form
    initCouponForm();
    
    // Load recommended products
    loadRecommendedProducts();
  }
  
  // Check if we're on the checkout page
  if (document.getElementById('shipping-form')) {
    // Initialize checkout process
    initCheckout();
  }
});

// Function to load cart
function loadCart() {
  // Update cart count in header
  updateCartCount();
  
  // Check if we're on the cart page
  const cartContent = document.getElementById('cart-content');
  if (!cartContent) return;
  
  // Get cart items
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    // Show empty cart message
    cartContent.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">
          <i class="bi bi-cart-x"></i>
        </div>
        <h2 class="cart-empty-title">Your cart is empty</h2>
        <p class="cart-empty-message">Looks like you haven't added any items to your cart yet.</p>
        <a href="products.html" class="btn btn-primary animate-hover">
          Start Shopping
        </a>
      </div>
    `;
    
    // Hide cart summary section
    document.getElementById('cart-summary-section').style.display = 'none';
    
    return;
  }
  
  // Show cart items
  let cartItemsHtml = '';
  let subtotal = 0;
  
  cart.forEach((item, index) => {
    const product = window.productData.getById(item.id);
    if (!product) return;
    
    // Calculate item total
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    // Create variant string if variants exist
    let variantString = '';
    if (item.variants && Object.keys(item.variants).length > 0) {
      for (const [variant, value] of Object.entries(item.variants)) {
        variantString += `<div class="cart-item-variant">${capitalizeFirstLetter(variant)}: ${value}</div>`;
      }
    }
    
    cartItemsHtml += `
      <div class="cart-item" data-index="${index}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">
            <a href="product-detail.html?id=${item.id}">${item.name}</a>
          </h3>
          ${variantString}
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-actions">
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease-quantity">-</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10">
              <button class="quantity-btn increase-quantity">+</button>
            </div>
            <a href="#" class="remove-item">
              <i class="bi bi-trash"></i> Remove
            </a>
          </div>
        </div>
        <div class="cart-item-subtotal">
          $${itemTotal.toFixed(2)}
        </div>
      </div>
    `;
  });
  
  // Show cart items
  document.getElementById('cart-items-container').innerHTML = cartItemsHtml;
  
  // Update cart summary
  updateCartSummary(subtotal);
  
  // Add event listeners to quantity buttons
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.getAttribute('data-index'));
      const quantityInput = cartItem.querySelector('.quantity-input');
      let quantity = parseInt(quantityInput.value);
      
      if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateCartItemQuantity(index, quantity);
      }
    });
  });
  
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.getAttribute('data-index'));
      const quantityInput = cartItem.querySelector('.quantity-input');
      let quantity = parseInt(quantityInput.value);
      
      if (quantity < 10) {
        quantity++;
        quantityInput.value = quantity;
        updateCartItemQuantity(index, quantity);
      }
    });
  });
  
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function() {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.getAttribute('data-index'));
      let quantity = parseInt(this.value);
      
      if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        this.value = 1;
      } else if (quantity > 10) {
        quantity = 10;
        this.value = 10;
      }
      
      updateCartItemQuantity(index, quantity);
    });
  });
  
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.getAttribute('data-index'));
      removeCartItem(index);
    });
  });
}

// Function to update cart item quantity
function updateCartItemQuantity(index, quantity) {
  // Get cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update quantity
  cart[index].quantity = quantity;
  
  // Save cart
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Reload cart
  loadCart();
}

// Function to remove cart item
function removeCartItem(index) {
  // Get cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Remove item
  cart.splice(index, 1);
  
  // Save cart
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Reload cart
  loadCart();
  
  // Show toast notification
  showToast('Item Removed', 'The item has been removed from your cart.', 'info');
}

// Function to update cart summary
function updateCartSummary(subtotal) {
  // Set subtotal
  document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  
  // Get applied coupon
  const coupon = localStorage.getItem('appliedCoupon');
  const discountRow = document.getElementById('discount-row');
  
  let discount = 0;
  
  if (coupon) {
    // For demo, let's say all coupons give 10% off
    discount = subtotal * 0.1;
    document.getElementById('cart-discount').textContent = `-$${discount.toFixed(2)}`;
    discountRow.style.display = 'flex';
  } else {
    discountRow.style.display = 'none';
  }
  
  // Calculate shipping (free over $75, otherwise $5.99)
  let shipping = subtotal > 75 ? 0 : 5.99;
  document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  
  // Calculate tax (for demo, let's use 8%)
  const tax = (subtotal - discount) * 0.08;
  document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
  
  // Calculate total
  const total = subtotal - discount + shipping + tax;
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
  
  // Disable checkout button if subtotal is 0
  const checkoutButton = document.getElementById('checkout-button');
  if (subtotal === 0) {
    checkoutButton.disabled = true;
  } else {
    checkoutButton.disabled = false;
  }
}

// Function to initialize coupon form
function initCouponForm() {
  const couponForm = document.getElementById('coupon-form');
  if (!couponForm) return;
  
  couponForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const couponCode = document.getElementById('coupon-code').value.trim();
    
    if (!couponCode) {
      showToast('Error', 'Please enter a coupon code.', 'error');
      return;
    }
    
    // For demo, accept any coupon code
    localStorage.setItem('appliedCoupon', couponCode);
    
    // Reload cart to apply coupon
    loadCart();
    
    // Show success message
    showToast('Coupon Applied', 'Your coupon has been applied successfully.', 'success');
    
    // Clear coupon input
    document.getElementById('coupon-code').value = '';
  });
}

// Function to load recommended products
function loadRecommendedProducts() {
  const recommendedProductsContainer = document.getElementById('recommended-products');
  if (!recommendedProductsContainer) return;
  
  // Get 4 random products for recommendations
  const allProducts = window.productData.getAll();
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  const recommendedProducts = shuffled.slice(0, 4);
  
  let html = '';
  
  recommendedProducts.forEach(product => {
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
            
            <button class="btn btn-outline-primary w-100 add-to-cart animate-hover" data-product-id="${product.id}">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  recommendedProductsContainer.innerHTML = html;
  
  // Add event listeners to Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToCart(productId, 1);
    });
  });
}

// Function to initialize checkout process
function initCheckout() {
  // Load order summary
  loadOrderSummary();
  
  // Initialize shipping form
  const shippingForm = document.getElementById('shipping-form');
  if (shippingForm) {
    shippingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Go to payment step
      goToStep('payment');
    });
  }
  
  // Initialize payment form
  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Go to review step
      goToStep('review');
      
      // Populate review step with form data
      populateReviewStep();
    });
  }
  
  // Add event listeners to back buttons
  document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', function() {
      const currentStep = document.querySelector('.checkout-step-content.active').id.replace('-step', '');
      
      if (currentStep === 'payment') {
        goToStep('shipping');
      } else if (currentStep === 'review') {
        goToStep('payment');
      }
    });
  });
  
  // Add event listeners to edit buttons in review step
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
      const step = this.getAttribute('data-step');
      goToStep(step);
    });
  });
  
  // Add event listener to place order button
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function() {
      // Process order
      processOrder();
    });
  }
  
  // Add event listeners to shipping method radio buttons
  document.querySelectorAll('input[name="shipping-method"]').forEach(radio => {
    radio.addEventListener('change', function() {
      // Update order summary with selected shipping method
      updateShippingCost(this.value);
    });
  });
  
  // Add event listeners to payment method radio buttons
  document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', function() {
      // Toggle payment method details
      togglePaymentMethodDetails(this.value);
    });
  });
}

// Function to load order summary
function loadOrderSummary() {
  const orderSummaryItems = document.getElementById('order-summary-items');
  if (!orderSummaryItems) return;
  
  // Get cart items
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    // Redirect to cart page if cart is empty
    window.location.href = 'cart.html';
    return;
  }
  
  let html = '';
  let subtotal = 0;
  
  cart.forEach(item => {
    const product = window.productData.getById(item.id);
    if (!product) return;
    
    // Calculate item total
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    html += `
      <div class="order-item">
        <div class="order-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="order-item-details">
          <div class="order-item-title">${item.name}</div>
          <div class="order-item-variant">Qty: ${item.quantity}</div>
        </div>
        <div class="order-item-price">$${itemTotal.toFixed(2)}</div>
      </div>
    `;
  });
  
  orderSummaryItems.innerHTML = html;
  
  // Update summary
  document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  
  // Get applied coupon
  const coupon = localStorage.getItem('appliedCoupon');
  const discountRow = document.getElementById('summary-discount-row');
  
  let discount = 0;
  
  if (coupon) {
    // For demo, let's say all coupons give 10% off
    discount = subtotal * 0.1;
    document.getElementById('summary-discount').textContent = `-$${discount.toFixed(2)}`;
    discountRow.style.display = 'flex';
  } else {
    discountRow.style.display = 'none';
  }
  
  // Set initial shipping cost (standard shipping)
  let shipping = 5.99;
  document.getElementById('summary-shipping').textContent = `$${shipping.toFixed(2)}`;
  
  // Calculate tax (for demo, let's use 8%)
  const tax = (subtotal - discount) * 0.08;
  document.getElementById('summary-tax').textContent = `$${tax.toFixed(2)}`;
  
  // Calculate total
  const total = subtotal - discount + shipping + tax;
  document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

// Function to update shipping cost
function updateShippingCost(shippingMethod) {
  let shipping = 5.99; // Standard
  
  if (shippingMethod === 'express') {
    shipping = 12.99;
  } else if (shippingMethod === 'overnight') {
    shipping = 24.99;
  }
  
  document.getElementById('summary-shipping').textContent = `$${shipping.toFixed(2)}`;
  
  // Recalculate total
  const subtotal = parseFloat(document.getElementById('summary-subtotal').textContent.replace('$', ''));
  const discountEl = document.getElementById('summary-discount');
  const discount = discountEl.parentElement.style.display !== 'none' ? 
    parseFloat(discountEl.textContent.replace('-$', '')) : 0;
  const tax = parseFloat(document.getElementById('summary-tax').textContent.replace('$', ''));
  
  const total = subtotal - discount + shipping + tax;
  document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

// Function to toggle payment method details
function togglePaymentMethodDetails(paymentMethod) {
  const creditCardForm = document.getElementById('credit-card-form');
  const paypalInfo = document.getElementById('paypal-info');
  
  if (paymentMethod === 'credit-card') {
    creditCardForm.style.display = 'block';
    paypalInfo.style.display = 'none';
  } else if (paymentMethod === 'paypal') {
    creditCardForm.style.display = 'none';
    paypalInfo.style.display = 'block';
  }
}

// Function to go to checkout step
function goToStep(step) {
  // Update progress bar
  const progressBar = document.getElementById('checkout-progress-bar');
  
  if (step === 'shipping') {
    progressBar.style.width = '25%';
    progressBar.setAttribute('aria-valuenow', '25');
  } else if (step === 'payment') {
    progressBar.style.width = '50%';
    progressBar.setAttribute('aria-valuenow', '50');
  } else if (step === 'review') {
    progressBar.style.width = '75%';
    progressBar.setAttribute('aria-valuenow', '75');
  } else if (step === 'confirmation') {
    progressBar.style.width = '100%';
    progressBar.setAttribute('aria-valuenow', '100');
  }
  
  // Update active step
  document.querySelectorAll('.checkout-step').forEach(stepEl => {
    stepEl.classList.remove('active');
  });
  
  document.getElementById(`step-${step}`).classList.add('active');
  
  // Show active step content
  document.querySelectorAll('.checkout-step-content').forEach(content => {
    content.classList.remove('active');
  });
  
  document.getElementById(`${step}-step`).classList.add('active');
}

// Function to populate review step
function populateReviewStep() {
  // Get shipping info
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const address2 = document.getElementById('address2').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zip = document.getElementById('zip').value;
  const country = document.getElementById('country').value;
  
  const shippingMethod = document.querySelector('input[name="shipping-method"]:checked').value;
  let shippingMethodText = 'Standard Shipping (3-5 business days)';
  
  if (shippingMethod === 'express') {
    shippingMethodText = 'Express Shipping (2-3 business days)';
  } else if (shippingMethod === 'overnight') {
    shippingMethodText = 'Overnight Shipping (1 business day)';
  }
  
  // Populate shipping info in review step
  document.getElementById('review-shipping-info').innerHTML = `
    <p><strong>${firstName} ${lastName}</strong></p>
    <p>${address}</p>
    ${address2 ? `<p>${address2}</p>` : ''}
    <p>${city}, ${state} ${zip}</p>
    <p>${country}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Shipping Method: ${shippingMethodText}</p>
  `;
  
  // Get payment info
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  let paymentMethodText = '';
  
  if (paymentMethod === 'credit-card') {
    const cardNumber = document.getElementById('card-number').value;
    const lastFour = cardNumber.slice(-4).padStart(cardNumber.length, '•');
    const nameOnCard = document.getElementById('name-on-card').value;
    
    paymentMethodText = `
      <p>Credit Card: ${lastFour}</p>
      <p>Name on Card: ${nameOnCard}</p>
    `;
  } else if (paymentMethod === 'paypal') {
    paymentMethodText = `
      <p>PayPal</p>
      <p>You will be redirected to PayPal to complete your payment.</p>
    `;
  }
  
  // Populate payment info in review step
  document.getElementById('review-payment-info').innerHTML = paymentMethodText;
  
  // Populate order items in review step
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let reviewItemsHtml = '';
  
  cart.forEach(item => {
    const product = window.productData.getById(item.id);
    if (!product) return;
    
    // Create variant string if variants exist
    let variantString = '';
    if (item.variants && Object.keys(item.variants).length > 0) {
      for (const [variant, value] of Object.entries(item.variants)) {
        variantString += `${capitalizeFirstLetter(variant)}: ${value}, `;
      }
      variantString = variantString.slice(0, -2); // Remove trailing comma and space
    }
    
    reviewItemsHtml += `
      <div class="review-item">
        <div class="review-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="review-item-details">
          <div class="review-item-title">${item.name}</div>
          ${variantString ? `<div class="review-item-variant">${variantString}</div>` : ''}
          <div class="review-item-price">$${item.price.toFixed(2)} each</div>
        </div>
        <div class="review-item-quantity">
          Qty: ${item.quantity}
        </div>
      </div>
    `;
  });
  
  document.getElementById('review-items').innerHTML = reviewItemsHtml;
  
  // Save shipping and payment info to localStorage for the order processing
  localStorage.setItem('checkoutInfo', JSON.stringify({
    shipping: {
      firstName,
      lastName,
      email,
      phone,
      address,
      address2,
      city,
      state,
      zip,
      country,
      method: shippingMethod
    },
    payment: {
      method: paymentMethod
    }
  }));
}

// Function to process order
function processOrder() {
  // Generate a random order number
  const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  
  // Get checkout info
  const checkoutInfo = JSON.parse(localStorage.getItem('checkoutInfo'));
  
  // Update order number and email in confirmation step
  document.getElementById('order-number').textContent = orderNumber;
  document.getElementById('confirmation-email').textContent = checkoutInfo.shipping.email;
  
  // Populate order details in confirmation step
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let orderDetailsHtml = '';
  
  cart.forEach(item => {
    const product = window.productData.getById(item.id);
    if (!product) return;
    
    orderDetailsHtml += `
      <div class="d-flex justify-content-between mb-2">
        <span>${item.name} x ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
  });
  
  // Add shipping, tax, and total
  const subtotal = parseFloat(document.getElementById('summary-subtotal').textContent.replace('$', ''));
  const discountEl = document.getElementById('summary-discount');
  const discount = discountEl.parentElement.style.display !== 'none' ? 
    parseFloat(discountEl.textContent.replace('-$', '')) : 0;
  const shipping = parseFloat(document.getElementById('summary-shipping').textContent.replace('$', ''));
  const tax = parseFloat(document.getElementById('summary-tax').textContent.replace('$', ''));
  const total = parseFloat(document.getElementById('summary-total').textContent.replace('$', ''));
  
  orderDetailsHtml += `
    <hr>
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
  `;
  
  if (discount > 0) {
    orderDetailsHtml += `
      <div class="d-flex justify-content-between mb-2">
        <span>Discount</span>
        <span>-$${discount.toFixed(2)}</span>
      </div>
    `;
  }
  
  orderDetailsHtml += `
    <div class="d-flex justify-content-between mb-2">
      <span>Shipping</span>
      <span>$${shipping.toFixed(2)}</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Tax</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <hr>
    <div class="d-flex justify-content-between fw-bold">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;
  
  document.getElementById('confirmation-order-details').innerHTML = orderDetailsHtml;
  
  // Go to confirmation step
  goToStep('confirmation');
  
  // Clear cart and checkout info
  localStorage.removeItem('cart');
  localStorage.removeItem('appliedCoupon');
  localStorage.removeItem('checkoutInfo');
  
  // Update cart count
  updateCartCount();
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
  
  // Reload cart if on cart page
  if (document.getElementById('cart-content')) {
    loadCart();
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