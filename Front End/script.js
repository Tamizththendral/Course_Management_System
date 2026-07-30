document.addEventListener('DOMContentLoaded', function () {
  highlightActiveNavLink();
  setupRegisterValidation();
  setupLoginValidation();
});

function highlightActiveNavLink() {
  const navLinks = document.querySelectorAll('nav ul li a');
  let currentPage = window.location.pathname.split('/').pop();

  if (currentPage === '') {
    currentPage = 'index.html';
  }

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active-link');
      link.style.color = '#2547D0';
      link.style.fontWeight = '600';
    }
  });
}

function showError(input, message) {
  removeError(input);

  const errorText = document.createElement('p');
  errorText.className = 'error-message';
  errorText.style.color = '#DC2626';
  errorText.style.fontSize = '12.5px';
  errorText.style.marginTop = '6px';
  errorText.textContent = message;

  input.insertAdjacentElement('afterend', errorText);
  input.style.borderColor = '#DC2626';
}

function removeError(input) {
  input.style.borderColor = '';
  const nextElement = input.nextElementSibling;
  if (nextElement && nextElement.classList.contains('error-message')) {
    nextElement.remove();
  }
}

function clearAllErrors(form) {
  form.querySelectorAll('.error-message').forEach(function (el) {
    el.remove();
  });
  form.querySelectorAll('input, select').forEach(function (field) {
    field.style.borderColor = '';
  });
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function setupRegisterValidation() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearAllErrors(form);

    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const department = document.getElementById('department');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    if (name.value.trim().length < 2) {
      showError(name, 'Name must be at least 2 characters.');
      isValid = false;
    }

    if (!isValidEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      isValid = false;
    }

    if (department.value === '') {
      showError(department, 'Please select your department.');
      isValid = false;
    }

    if (password.value.length < 8) {
      showError(password, 'Password must be at least 8 characters.');
      isValid = false;
    }

    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, 'Passwords do not match.');
      isValid = false;
    }

    if (isValid) {
      alert('Registration successful!');
      form.reset();
    }
  });
}

function setupLoginValidation() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearAllErrors(form);

    let isValid = true;

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!isValidEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      isValid = false;
    }

    if (password.value.trim() === '') {
      showError(password, 'Password cannot be empty.');
      isValid = false;
    }

    if (isValid) {
      alert('Login successful!');
    }
  });
}
