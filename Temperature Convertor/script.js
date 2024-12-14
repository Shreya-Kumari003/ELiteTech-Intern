const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');
const kelvinInput = document.getElementById('kelvin');
const clearButton = document.getElementById('clearButton');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');
const themeSwitch = document.getElementById('themeSwitch');

function convertFromCelsius(value) {
  const fahrenheit = (value * 9 / 5) + 32;
  const kelvin = parseFloat(value) + 273.15;
  return { fahrenheit, kelvin };
}

function convertFromFahrenheit(value) {
  const celsius = (value - 32) * 5 / 9;
  const kelvin = celsius + 273.15;
  return { celsius, kelvin };
}

function convertFromKelvin(value) {
  const celsius = value - 273.15;
  const fahrenheit = (celsius * 9 / 5) + 32;
  return { celsius, fahrenheit };
}


function handleInputChange(event) {
  const value = parseFloat(event.target.value);
  if (isNaN(value)) return;

  let celsius, fahrenheit, kelvin;

  if (event.target.id === 'celsius') {
    ({ fahrenheit, kelvin } = convertFromCelsius(value));
    fahrenheitInput.value = fahrenheit.toFixed(2);
    kelvinInput.value = kelvin.toFixed(2);
  } else if (event.target.id === 'fahrenheit') {
    ({ celsius, kelvin } = convertFromFahrenheit(value));
    celsiusInput.value = celsius.toFixed(2);
    kelvinInput.value = kelvin.toFixed(2);
  } else if (event.target.id === 'kelvin') {
    ({ celsius, fahrenheit } = convertFromKelvin(value));
    celsiusInput.value = celsius.toFixed(2);
    fahrenheitInput.value = fahrenheit.toFixed(2);
  }

  addToHistory(celsiusInput.value, fahrenheitInput.value, kelvinInput.value);
}

function addToHistory(celsius, fahrenheit, kelvin) {
  const listItem = document.createElement('li');
  listItem.textContent = `C: ${celsius}° | F: ${fahrenheit}° | K: ${kelvin}`;
  historyList.appendChild(listItem);
}

function clearAllFields() {
  celsiusInput.value = '';
  fahrenheitInput.value = '';
  kelvinInput.value = '';
}

function clearHistory() {
  historyList.innerHTML = '';
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}



// Function to copy value to clipboard
function copyToClipboard(field) {
  let inputValue;
  if (field === 'celsius') {
    inputValue = celsiusInput.value;
  } else if (field === 'fahrenheit') {
    inputValue = fahrenheitInput.value;
  } else if (field === 'kelvin') {
    inputValue = kelvinInput.value;
  }

  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = inputValue;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);

  alert('Copied to clipboard: ' + inputValue);
}

celsiusInput.addEventListener('input', handleInputChange);
fahrenheitInput.addEventListener('input', handleInputChange);
kelvinInput.addEventListener('input', handleInputChange);
clearButton.addEventListener('click', clearAllFields);
clearHistoryButton.addEventListener('click', clearHistory);
themeSwitch.addEventListener('change', toggleTheme);
