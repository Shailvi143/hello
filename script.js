const loginForm = document.getElementById('login-form');
const loginCard = document.getElementById('login-card');
const welcomeCard = document.getElementById('welcome-card');
const welcomeText = document.getElementById('welcome-text');
const errorMessage = document.getElementById('error-message');
const logoutButton = document.getElementById('logout-button');

const VALID_USERNAME = 'user';
const VALID_PASSWORD = 'password';

function showWelcome(username) {
  welcomeText.textContent = `Hello, ${username}! Welcome to the site.`;
  loginCard.classList.add('hidden');
  welcomeCard.classList.remove('hidden');
}

function showLogin() {
  loginCard.classList.remove('hidden');
  welcomeCard.classList.add('hidden');
  errorMessage.textContent = '';
  loginForm.reset();
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    errorMessage.textContent = 'Please enter both username and password.';
    return;
  }

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    showWelcome(username);
  } else {
    errorMessage.textContent = 'Invalid credentials. Try user / password.';
  }
});

logoutButton.addEventListener('click', () => {
  showLogin();
});
