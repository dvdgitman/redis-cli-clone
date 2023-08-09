// This is the main function responsible for executing the Redis-like commands.
function executeCommand() {
  const commandInput = document.getElementById('cliInput').value.trim();
  document.getElementById('cliInput').value = '';
  const parts = commandInput.split(' ');
  const command = parts[0].toUpperCase();
  const key = parts[1];
  const value = parts[2];

  if (command === 'SET' && (!key || !value)) {
      displayOutput('Please provide both a key and a value for the SET command.');
      return;
  }

  if (!commandInput) {
      displayOutput('Please enter a command.');
      return;
  }

  switch (command) {
      case 'SET':
          setKeyValue(key, value);
          break;
      case 'GET':
          getValue(key);
          break;
      case 'DEL':
          deleteValue(key);
          break;
      case 'EXIST':
          checkExistence(key);
          break;
      case 'KEYS':
          getKeys();
          break;
      default:
          displayOutput('Invalid command.');
  }
}

function setKeyValue(key, value) {
  if (localStorage.getItem(key) !== null) {
      if (!confirm('This key already exists. Do you want to overwrite the value?')) {
          return;
      }
  }
  localStorage.setItem(key, value);
  displayOutput(`Key: ${key}, Value: ${value} saved successfully.`);
}

function getValue(key) {
  const value = localStorage.getItem(key);
  displayOutput(`Key: ${key}, Value: ${value || 'not found'}.`);
}

function deleteValue(key) {
  localStorage.removeItem(key);
  displayOutput(`Key: ${key} deleted successfully.`);
}

function checkExistence(key) {
  const exists = localStorage.getItem(key) !== null;
  displayOutput(`Key: ${key} ${exists ? 'exists.' : 'does not exist.'}`);
}

function getKeys() {
  const keys = Object.keys(localStorage);
  displayOutput(`Keys: ${keys.join(', ')}`);
}

function displayOutput(message) {
  const output = document.getElementById('output');
  output.textContent += message + '\n';
}
