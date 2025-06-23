document.addEventListener('DOMContentLoaded', function() {
  initProfileNavigation();
  initProfileForms();
});

function initProfileNavigation() {
  const menuItems = document.querySelectorAll('.profile-menu .list-group-item');
  const sections = document.querySelectorAll('.profile-section-content');
  
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetSection = this.getAttribute('data-section');
      
      menuItems.forEach(menuItem => {
        menuItem.classList.remove('active');
      });
      
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      this.classList.add('active');
      document.getElementById(targetSection).classList.add('active');
    });
  });
}

function initProfileForms() {
  const personalInfoForm = document.getElementById('personal-info-form');
  if (personalInfoForm) {
    personalInfoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      
      // Update profile name display
      const profileName = firstName + (lastName ? ' ' + lastName : '');
      document.getElementById('profile-name').textContent = profileName;
      
      showToast('Success', 'Personal information updated successfully!', 'success');
    });
  }
  
  const securityForm = document.getElementById('security-form');
  if (securityForm) {
    securityForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('Error', 'Please fill in all password fields.', 'error');
        return;
      }
      
      if (newPassword !== confirmPassword) {
        showToast('Error', 'New passwords do not match.', 'error');
        return;
      }
      
      if (newPassword.length < 8) {
        showToast('Error', 'Password must be at least 8 characters long.', 'error');
        return;
      }
      
      this.reset();
      showToast('Success', 'Password updated successfully!', 'success');
    });
  }
  
  const notificationsForm = document.getElementById('notifications-form');
  if (notificationsForm) {
    notificationsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Success', 'Notification preferences saved!', 'success');
    });
  }
  
  const changePictureBtn = document.getElementById('change-picture-btn');
  if (changePictureBtn) {
    changePictureBtn.addEventListener('click', function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            document.getElementById('profile-picture').src = e.target.result;
            showToast('Success', 'Profile picture updated!', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
      
      input.click();
    });
  }
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