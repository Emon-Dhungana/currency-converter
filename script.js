// Dark Mode Toggle
const darkModeButton = document.getElementById('dark-mode-button');
const body = document.body;

darkModeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  darkModeButton.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Rest of your existing JavaScript code...
// API Key (Replace with your own API key from https://www.exchangerate-api.com/)
const API_KEY = '79e9f914ac9970bf261287b6';
const API_URL = `https://v6.exchangerate-api.com/v6/79e9f914ac9970bf261287b6/latest/USD`;

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const convertButton = document.getElementById('convert');
const output = document.getElementById('output');

let exchangeRates = {};

// Fetch exchange rates from API
async function fetchExchangeRates() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.result === 'success') {
      exchangeRates = data.conversion_rates;
      populateCurrencyOptions();
    } else {
      throw new Error('Failed to fetch exchange rates');
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    output.textContent = 'Error fetching exchange rates. Please try again later.';
  }
}

// Populate currency options in dropdowns
function populateCurrencyOptions() {
  const currencies = Object.keys(exchangeRates);

  // Clear existing options
  fromCurrency.innerHTML = '';
  toCurrency.innerHTML = '';

  // Add currencies to dropdowns
  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });

  // Set default values
  fromCurrency.value = 'USD';
  toCurrency.value = 'NPR';
}

// Convert currency
function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount < 0) {
    output.textContent = 'Please enter a valid amount.';
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!exchangeRates[from] || !exchangeRates[to]) {
    output.textContent = 'Invalid currency selection.';
    return;
  }

  const convertedAmount = (amount / exchangeRates[from]) * exchangeRates[to];
  output.textContent = `Result: ${convertedAmount.toFixed(2)} ${to}`;
}

// Event Listeners
convertButton.addEventListener('click', convertCurrency);

// Initialize
fetchExchangeRates();