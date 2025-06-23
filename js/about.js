document.addEventListener('DOMContentLoaded', function() {
  animateStats();
});

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateNumber(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

function animateNumber(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 20);
}