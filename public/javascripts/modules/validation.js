// Validates a string
// Return true if no match is found.
let validateInput = (input) => !input.match(/[|;$%"<>()+]/g);

// Validates the format of an email.
// Return true if match is found.
let validateEmail = (input) => !!input.match(/[a-z]+@school\.com/g);

// Validates the format of the postcode.
// Return true if match is found.
let validatePostcode = (input) => !!input.match(/([A-Z]|[a-z]){2}(([A-Z]|[a-z])|[1-9]{1,2})\s?[1-9]([A-Z]|[a-z]){2}/g);

try{ 
  // To allow the test file to access the functions without showing an error on browser terminal.
  module.exports = {validateInput, validateEmail, validatePostcode};
} catch (err){}
