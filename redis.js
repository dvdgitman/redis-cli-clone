function executeCommand() {
  const commandInput = document.getElementById('cliInput').value.trim();
  document.getElementById('cliInput').value = '';

  if (!commandInput) {
      displayOutput('Please enter a command.');
      return;
  }

  const { command, key, value } = extractCommandParts(commandInput);
  if (!validateCommand(command, key, value)) {
      return;
  }

  switch (command) {
      case 'SET':
          const isExist = isKeyExist(key);
          
          if (isExist && !confirm('This key already exists. Do you want to overwrite the value?')) {
            return false;
          }

          localStorage.setItem(key, value);
          displayOutput(`Key: ${key}, Value: ${value} saved successfully.`);
          break;
      case 'GET':
          const storedValue = localStorage.getItem(key);
          displayOutput(`Key: ${key}, Value: ${storedValue || 'not found'}.`);
          break;
      case 'DEL':
          localStorage.removeItem(key);
          displayOutput(`Key: ${key} deleted successfully.`);
          break;
      case 'EXIST':
          const exists = isKeyExist(key);
          displayOutput(`Key: ${key} ${exists ? 'exists.' : 'does not exist.'}`);
          break;
      case 'KEYS':
          const keys = Object.keys(localStorage);
          displayOutput(`Keys: ${keys.join(', ')}`);
          break;
      default:
          displayOutput('Invalid command.');
  }
}

function isKeyExist(key) {
  return localStorage.getItem(key) !== null;
}

function extractCommandParts(commandInput) {
  const [command, ...args] = commandInput.split(' ');
  const key = args[0];
  const value = args[1];
  return { command: command.toUpperCase(), key, value };
}

function validateCommand(command, key, value) {
  if (command === 'SET' && (!key || !value)) {
      displayOutput('Please provide both a key and a value for the SET command.');
      return false;
  }

  if (!key && command !== 'KEYS') {
    displayOutput('Please provide a key for the command.');
    return false;
  }

  return true;
}

function displayOutput(message) {
  const output = document.getElementById('output');
  output.textContent += message + '\n';
}
