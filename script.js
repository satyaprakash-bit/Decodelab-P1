'use strict';

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav after a link is tapped
primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Card filtering (client-side state) ---------- */
const filterForm = document.getElementById('filterForm');
const cards = Array.from(document.querySelectorAll('#cardGrid .card'));

function applyFilters() {
  const checked = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'))
    .map((input) => input.value);

  cards.forEach((card) => {
    const matches = checked.includes(card.dataset.type);
    card.hidden = !matches;
  });
}

filterForm.addEventListener('change', applyFilters);
applyFilters();

/* ---------- Line-of-code counter ---------- */
const counterValue = document.getElementById('counterValue');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
let count = 0;

function renderCount() {
  counterValue.textContent = String(count);
}

increment.addEventListener('click', () => {
  count += 1;
  renderCount();
});

decrement.addEventListener('click', () => {
  count = Math.max(0, count - 1);
  renderCount();
});

/* ---------- Contact form validation ---------- */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const fields = {
  name: {
    input: document.getElementById('name'),
    error: document.getElementById('nameError'),
    validate: (value) => value.trim().length > 0,
    message: 'Please enter your name.',
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('emailError'),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: 'Please enter a valid email address.',
  },
  message: {
    input: document.getElementById('message'),
    error: document.getElementById('messageError'),
    validate: (value) => value.trim().length >= 10,
    message: 'Please share at least a sentence about the project.',
  },
};

function validateField(field) {
  const value = field.input.value;
  const valid = field.validate(value);
  field.error.textContent = valid ? '' : field.message;
  field.input.setAttribute('aria-invalid', String(!valid));
  return valid;
}

Object.values(fields).forEach((field) => {
  field.input.addEventListener('blur', () => validateField(field));
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const results = Object.values(fields).map(validateField);
  const allValid = results.every(Boolean);

  if (!allValid) {
    formStatus.textContent = 'Please fix the highlighted fields.';
    formStatus.style.color = '#B3452C';
    return;
  }

  formStatus.textContent = 'Thanks — your message has been noted. We\'ll be in touch soon.';
  formStatus.style.color = '#4E7A5C';
  contactForm.reset();
});

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = String(new Date().getFullYear());
