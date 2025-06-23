document.addEventListener('DOMContentLoaded', function() {
  // Initialize steps navigation
  initStepsNavigation();
  
  // Update order summary from localStorage
  updateOrderSummary();
  
  // Initialize form validation
  initFormValidation();
});

// Function to initialize steps navigation
function initStepsNavigation() {
  // Initialize step buttons
  const continueButtons = document.querySelectorAll('.continue-btn');
  continueButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const currentStep = this.closest('.checkout-step-content');
      const currentStepId = currentStep.id;
      
      // Validate current step before proceeding
      if (!validateCurrentStep(currentStepId)) {
        return;
      }
      
      let nextStepId;
      if (currentStepId === 'shipping-step') {
        nextStepId = 'payment-step';
      } else if (currentStepId === 'payment-step') {
        nextStepId = 'review-step';
        // Populate review data
        populateReviewData();
      }
      
      if (nextStepId) {
        // Update progress bar
        updateProgressBar(nextStepId);
        
        // Hide current step
        currentStep.classList.remove('active');
        
        // Show next step
        document.getElementById(nextStepId).classList.add('active');
      }
    });
  });
  
  // Initialize back buttons
  const backButtons = document.querySelectorAll('.back-btn');
  backButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentStep = this.closest('.checkout-step-content');
      const currentStepId = currentStep.id;
      
      let prevStepId;
      if (currentStepId === 'payment-step') {
        prevStepId = 'shipping-step';
      } else if (currentStepId === 'review-step') {
        prevStepId = 'payment-step';
      }
      
      if (prevStepId) {
        // Update progress bar
        updateProgressBar(prevStepId);
        
        // Hide current step
        currentStep.classList.remove('active');
        
        // Show previous step
        document.getElementById(prevStepId).classList.add('active');
      }
    });
  });
  
  // Initialize edit buttons in review step
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const step = this.getAttribute('data-step');
      const stepId = `${step}-step`;
      
      // Update progress bar
      updateProgressBar(stepId);
      
      // Hide review step
      document.getElementById('review-step').classList.remove('active');
      
      // Show the selected step
      document.getElementById(stepId).classList.add('active');
    });
  });
  
  // Initialize place order button
  const placeOrderButton = document.getElementById('place-order-btn');
  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', function() {
      // Process the order
      processOrder();
    });
  }
}

// Function to validate current step
function validateCurrentStep(stepId) {
  if (stepId === 'shipping-step') {
    return validateShippingForm();
  } else if (stepId === 'payment-step') {
    return validatePaymentForm();
  }
  return true;
}

// Function to validate shipping form
function validateShippingForm() {
  const requiredFields = [
    'first-name', 'last-name', 'email', 'phone', 
    'address', 'city', 'state', 'zip', 'country'
  ];
  
  let isValid = true;
  const errors = [];
  
  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field && !field.value.trim()) {
      isValid = false;
      field.classList.add('is-invalid');
      errors.push(`${field.labels[0].textContent} is required`);
    } else if (field) {
      field.classList.remove('is-invalid');
    }
  });
  
  // Validate email format
  const emailField = document.getElementById('email');
  if (emailField && emailField.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      isValid = false;
      emailField.classList.add('is-invalid');
      errors.push('Please enter a valid email address');
    }
  }
  
  // Validate phone format
  const phoneField = document.getElementById('phone');
  if (phoneField && phoneField.value.trim()) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phoneField.value.trim()) || phoneField.value.trim().length < 10) {
      isValid = false;
      phoneField.classList.add('is-invalid');
      errors.push('Please enter a valid phone number');
    }
  }
  
  if (!isValid) {
    showToast('Validation Error', errors[0], 'error');
  }
  
  return isValid;
}

// Function to validate payment form
function validatePaymentForm() {
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
  
  if (!paymentMethod) {
    showToast('Validation Error', 'Please select a payment method', 'error');
    return false;
  }
  
  if (paymentMethod.value === 'credit-card') {
    const requiredFields = ['card-number', 'expiry-date', 'cvv', 'name-on-card'];
    let isValid = true;
    const errors = [];
    
    requiredFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field && !field.value.trim()) {
        isValid = false;
        field.classList.add('is-invalid');
        errors.push(`${field.labels[0].textContent} is required`);
      } else if (field) {
        field.classList.remove('is-invalid');
      }
    });
    
    // Validate card number (basic check for 16 digits)
    const cardNumberField = document.getElementById('card-number');
    if (cardNumberField && cardNumberField.value.trim()) {
      const cardNumber = cardNumberField.value.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cardNumber)) {
        isValid = false;
        cardNumberField.classList.add('is-invalid');
        errors.push('Please enter a valid 16-digit card number');
      }
    }
    
    // Validate expiry date (MM/YY format)
    const expiryField = document.getElementById('expiry-date');
    if (expiryField && expiryField.value.trim()) {
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryRegex.test(expiryField.value.trim())) {
        isValid = false;
        expiryField.classList.add('is-invalid');
        errors.push('Please enter expiry date in MM/YY format');
      }
    }
    
    // Validate CVV (3 digits)
    const cvvField = document.getElementById('cvv');
    if (cvvField && cvvField.value.trim()) {
      if (!/^\d{3}$/.test(cvvField.value.trim())) {
        isValid = false;
        cvvField.classList.add('is-invalid');
        errors.push('Please enter a valid 3-digit CVV');
      }
    }
    
    if (!isValid) {
      showToast('Validation Error', errors[0], 'error');
    }
    
    return isValid;
  }
  
  return true;
}

// Function to initialize form validation
function initFormValidation() {
  // Add real-time validation for email
  const emailField = document.getElementById('email');
  if (emailField) {
    emailField.addEventListener('blur', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value.trim() && !emailRegex.test(this.value.trim())) {
        this.classList.add('is-invalid');
      } else {
        this.classList.remove('is-invalid');
      }
    });
  }
  
  // Add real-time validation for card number
  const cardNumberField = document.getElementById('card-number');
  if (cardNumberField) {
    cardNumberField.addEventListener('input', function() {
      // Format card number with spaces
      let value = this.value.replace(/\s/g, '').replace(/\D/g, '');
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      this.value = value;
      
      // Validate length
      const cardNumber = value.replace(/\s/g, '');
      if (cardNumber.length === 16) {
        this.classList.remove('is-invalid');
      }
    });
  }
  
  // Add real-time validation for expiry date
  const expiryField = document.getElementById('expiry-date');
  if (expiryField) {
    expiryField.addEventListener('input', function() {
      // Format MM/YY
      let value = this.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      this.value = value;
    });
  }
  
  // Add real-time validation for CVV
  const cvvField = document.getElementById('cvv');
  if (cvvField) {
    cvvField.addEventListener('input', function() {
      // Only allow 3 digits
      this.value = this.value.replace(/\D/g, '').substring(0, 3);
    });
  }
}

// Function to update progress bar
function updateProgressBar(stepId) {
  const progressBar = document.getElementById('checkout-progress-bar');
  const steps = document.querySelectorAll('.checkout-step');
  
  steps.forEach(step => {
    step.classList.remove('active');
  });
  
  let progressValue = 25;
  let activeStepId = '';
  
  if (stepId === 'shipping-step') {
    progressValue = 25;
    activeStepId = 'step-shipping';
  } else if (stepId === 'payment-step') {
    progressValue = 50;
    activeStepId = 'step-payment';
  } else if (stepId === 'review-step') {
    progressValue = 75;
    activeStepId = 'step-review';
  } else if (stepId === 'confirmation-step') {
    progressValue = 100;
    activeStepId = 'step-confirmation';
  }
  
  progressBar.style.width = `${progressValue}%`;
  progressBar.setAttribute('aria-valuenow', progressValue);
  
  document.getElementById(activeStepId).classList.add('active');
}

// Function to populate review data
function populateReviewData() {
  // Get shipping information
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const address = document.getElementById('address').value;
  const address2 = document.getElementById('address2').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zip = document.getElementById('zip').value;
  const country = document.getElementById('country').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  
  // Get shipping method
  const shippingMethod = document.querySelector('input[name="shipping-method"]:checked');
  const shippingMethodLabel = shippingMethod.closest('label').textContent.trim();
  
  // Update shipping information in review step
  const reviewShippingInfo = document.getElementById('review-shipping-info');
  reviewShippingInfo.innerHTML = `
    <p><strong>${firstName} ${lastName}</strong></p>
    <p>${address}</p>
    ${address2 ? `<p>${address2}</p>` : ''}
    <p>${city}, ${state} ${zip}</p>
    <p>${country}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Shipping Method: ${shippingMethodLabel}</p>
  `;
  
  // Get payment information
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
  let paymentInfo = '';
  
  if (paymentMethod.value === 'credit-card') {
    const cardNumber = document.getElementById('card-number').value;
    const lastFour = cardNumber.substring(cardNumber.length - 4);
    const maskedNumber = '••••-••••-••••-' + lastFour;
    const nameOnCard = document.getElementById('name-on-card').value;
    
    paymentInfo = `
      <p>Credit/Debit Card</p>
      <p>${maskedNumber}</p>
      <p>Name on Card: ${nameOnCard}</p>
    `;
  } else if (paymentMethod.value === 'paypal') {
    paymentInfo = `
      <p>PayPal</p>
      <p>You will be redirected to PayPal to complete your payment.</p>
    `;
  }
  
  // Update payment information in review step
  const reviewPaymentInfo = document.getElementById('review-payment-info');
  reviewPaymentInfo.innerHTML = paymentInfo;
  
  // Get cart items
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update order items in review step
  const reviewItems = document.getElementById('review-items');
  let reviewItemsHtml = '';
  
  cart.forEach(item => {
    const product = window.productData.getById(item.id);
    if (!product) return;
    
    // Get variant info if available
    let variantInfo = '';
    if (item.variants) {
      for (const [key, value] of Object.entries(item.variants)) {
        variantInfo += `<div>${capitalizeFirstLetter(key)}: ${value}</div>`;
      }
    }
    
    reviewItemsHtml += `
      <div class="review-item">
        <div class="review-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="review-item-details">
          <div class="review-item-title">${item.name}</div>
          ${variantInfo}
          <div class="review-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="review-item-quantity">
          Qty: ${item.quantity}
        </div>
      </div>
    `;
  });
  
  reviewItems.innerHTML = reviewItemsHtml;
}

// Function to update order summary
function updateOrderSummary() {
  // Get cart items
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    // Redirect to cart page if cart is empty
    window.location.href = 'cart.html';
    return;
  }
  
  // Calculate subtotal
  let subtotal = 0;
  
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  // Update subtotal
  document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  
  // Check for discount
  const coupon = localStorage.getItem('appliedCoupon');
  if (coupon) {
    // For demo purposes, let's say all coupons give 10% off
    const discount = subtotal * 0.1;
    document.getElementById('summary-discount').textContent = `-$${discount.toFixed(2)}`;
    document.getElementById('summary-discount-row').style.display = 'flex';
  } else {
    document.getElementById('summary-discount-row').style.display = 'none';
  }
  
  // Update shipping cost based on selected method
  updateShippingCost();
  
  // Update tax (8% for demo)
  const discount = coupon ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  document.getElementById('summary-tax').textContent = `$${tax.toFixed(2)}`;
  
  // Update total
  updateTotal();
  
  // Display order items
  const orderSummaryItems = document.getElementById('order-summary-items');
  let itemsHtml = '';
  
  cart.forEach(item => {
    const product = window.productData.getById(item.id);
    if (!product) return;
    
    itemsHtml += `
      <div class="order-item">
        <div class="order-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="order-item-details">
          <div class="order-item-title">${item.name}</div>
          <div class="order-item-variant">Qty: ${item.quantity}</div>
        </div>
        <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `;
  });
  
  orderSummaryItems.innerHTML = itemsHtml;
  
  // Add event listeners to shipping method radios
  document.querySelectorAll('input[name="shipping-method"]').forEach(radio => {
    radio.addEventListener('change', updateShippingCost);
  });
}

// Function to update shipping cost
function updateShippingCost() {
  const selectedShipping = document.querySelector('input[name="shipping-method"]:checked');
  let shippingCost = 5.99; // Default to standard
  
  if (selectedShipping) {
    if (selectedShipping.value === 'express') {
      shippingCost = 12.99;
    } else if (selectedShipping.value === 'overnight') {
      shippingCost = 24.99;
    }
  }
  
  document.getElementById('summary-shipping').textContent = `$${shippingCost.toFixed(2)}`;
  
  // Update total
  updateTotal();
}

// Function to update total
function updateTotal() {
  const subtotal = parseFloat(document.getElementById('summary-subtotal').textContent.replace('$', ''));
  const discountRow = document.getElementById('summary-discount-row');
  const discount = discountRow.style.display !== 'none' ? 
    parseFloat(document.getElementById('summary-discount').textContent.replace('-$', '')) : 0;
  const shipping = parseFloat(document.getElementById('summary-shipping').textContent.replace('$', ''));
  const tax = parseFloat(document.getElementById('summary-tax').textContent.replace('$', ''));
  
  const total = subtotal - discount + shipping + tax;
  document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

// Function to process order
function processOrder() {
  // Generate random order number
  const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  
  // Set order number in confirmation
  document.getElementById('order-number').textContent = orderNumber;
  
  // Set confirmation email
  const email = document.getElementById('email').value;
  document.getElementById('confirmation-email').textContent = email;
  
  // Add order details to confirmation
  const orderDetails = document.getElementById('confirmation-order-details');
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
  
  // Add summary information
  const subtotal = parseFloat(document.getElementById('summary-subtotal').textContent.replace('$', ''));
  const discountRow = document.getElementById('summary-discount-row');
  const discount = discountRow.style.display !== 'none' ? 
    parseFloat(document.getElementById('summary-discount').textContent.replace('-$', '')) : 0;
  const shipping = parseFloat(document.getElementById('summary-shipping').textContent.replace('$', ''));
  const tax = parseFloat(document.getElementById('summary-tax').textContent.replace('$', ''));
  const total = parseFloat(document.getElementById('summary-total').textContent.replace('$', ''));
  
  orderDetailsHtml += `
    <hr>
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal:</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
  `;
  
  if (discount > 0) {
    orderDetailsHtml += `
      <div class="d-flex justify-content-between mb-2">
        <span>Discount:</span>
        <span>-$${discount.toFixed(2)}</span>
      </div>
    `;
  }
  
  orderDetailsHtml += `
    <div class="d-flex justify-content-between mb-2">
      <span>Shipping:</span>
      <span>$${shipping.toFixed(2)}</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Tax:</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <hr>
    <div class="d-flex justify-content-between fw-bold">
      <span>Total:</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;
  
  orderDetails.innerHTML = orderDetailsHtml;
  
  // Hide review step and show confirmation step
  document.getElementById('review-step').classList.remove('active');
  document.getElementById('confirmation-step').classList.add('active');
  
  // Update progress bar
  updateProgressBar('confirmation-step');
  
  // Clear cart
  localStorage.removeItem('cart');
  localStorage.removeItem('appliedCoupon');
  
  // Update cart count in header
  updateCartCount();
  
  // Show success message
  showToast('Order Placed', 'Your order has been placed successfully!', 'success');
}

// Helper function
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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