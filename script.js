const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

// Toggle menu open/close
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside header
document.addEventListener('click', (e) => {
  if (!e.target.closest('header')) {
    navLinks.classList.remove('active');
  }
});