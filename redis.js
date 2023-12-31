
// This is the main function responsible for executing the Redis-like commands.
function executeCommand() {
    // Gets the value of the input field with the ID 'command' and removes any leading or trailing whitespace using trim()
    // allows you to access an element in the HTML document by its unique ID.
    const commandInput = document.getElementById('cliInput').value.trim();
    document.getElementById('cliInput').value = '';
    // Splits the input into parts using split(' '), so the individual command and arguments can be extracted.
    const parts = commandInput.split(' ');
    // Converts the command (the first part) to uppercase using toUpperCase(), as Redis commands are case-insensitive.
    const command = parts[0].toUpperCase();
    // This line extracts the second part of the input, which represents the key in the Redis command
    const key = parts[1];
    // This line extracts the third part of the input, which represents the value in the Redis command
    const value = parts[2];
    // Handle missing key or value for SET command
    if (command === 'SET' && (!key || !value)) {
      displayOutput('Please provide both a key and a value for the SET command.');
      return;
    }
    // Handle empty command
    if (!commandInput) {
      displayOutput('Please enter a command.');
      return;
    }
    // switch statement that evaluates the value of the command variable and executes the corresponding function
    switch (command) {
      case 'SET':
      // Execute the SET command with the provided key and value
        setKeyValue(key, value);
        break;
      case 'GET':
      // Execute the GET command with the provided key
        getValue(key);
        break;
      case 'DEL':
      // Execute the DEL command with the provided key
        deleteValue(key);
        break;
      case 'EXIST':
      // Execute the EXIST command with the provided key
        checkExistence(key);
        break;
      case 'KEYS':
      // Execute the KEYS command to retrieve all keys from local storage
        getKeys();
        break;
      default:
        displayOutput('Invalid command.');
    }
  }

  // Function to handle the SET command and store key-value pairs in local storage
  function setKeyValue(key, value) {
    // Check if the key already exists in local storage
    if (localStorage.getItem(key) !== null) {
      // Prompt the user for confirmation before overwriting the existing value
      if (!confirm('This key already exists. Do you want to overwrite the value?')) {
        return;
      }
    }
    localStorage.setItem(key, value);
    displayOutput(`Key: ${key}, Value: ${value} saved successfully.`);
  }

  // Function to handle the GET command and retrieve values from local storage
  function getValue(key) {
    const value = localStorage.getItem(key);
    displayOutput(`Key: ${key}, Value: ${value || 'not found'}.`);
  }

  // Function to handle the DEL command and remove key-value pairs from local storage
  function deleteValue(key) {
    localStorage.removeItem(key);
    displayOutput(`Key: ${key} deleted successfully.`);
  }

  // Function to handle the EXIST command and check if a key exists in local storage
  function checkExistence(key) {
    const exists = localStorage.getItem(key) !== null;
    displayOutput(`Key: ${key} ${exists ? 'exists.' : 'does not exist.'}`);
  }

  // Function to handle the KEYS command and retrieve all keys from local storage
  function getKeys() {
    const keys = Object.keys(localStorage);
    displayOutput(`Keys: ${keys.join(', ')}`);
  }

  // Function to display output messages in the preformatted text area
  function displayOutput(message) {
    const output = document.getElementById('output');
    output.textContent = message;
  }

  // Function to display output messages in the CLI output area
  function displayOutput(message) {
    const output = document.getElementById('output');
    // Append the new output message to the existing content, adding a newline for better readability.
    output.textContent += message + '\n';
  }