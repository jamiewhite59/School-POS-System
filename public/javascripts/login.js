$(document).ready(function(){
  // Set listeners for click events.

  $('#loginSubmit').click(function(){
    login();
  })

  $('#registerButton').click(function(){
    open(this);
  })

  $('#modalRegisterButton').click(function(){
    registerAccount();
  })

  $('#closeRegisterModalButton').click(function(){
    close(this);
  })
});

// Check the values in the form are valid then checks the data with the server.
function login(){
  if (validateLoginDetails()){
    checkLogin();
  } 
}

// Validate the details in the login form.
function validateLoginDetails(){
  // Check inputs are not empty.
  if($('input[name="loginEmail"').val() && $('input[name="loginPassword"').val()){
    // Validate each input box.
    if(validateInput($('input[name="loginEmail"]').val()) && validateInput($('input[name="loginPassword"').val())){
        return true;
    }
    alertBanner("Illegal characters in input");
    return false;
  }
  alertBanner("Please fill out the entire form");
  return false;
}

// AJAX function
function checkLogin(){
  $.ajax({
    // POST route in the routes js file.
    url: "/login/login",
    type: "POST",
    // Datatype that is expected
    dataType: "json",
    data: $('#loginForm').serialize(),
    success: function(returned){
      // If the returned item has length = 1 then there is successful login.
      if(returned.length == 1){
        // Redirect to landing page.
        window.location.href = "/account"
      }
      else{
        alertBanner("Incorrect login details");
      }
    },
    error: function(){
      console.log('fail');
    }
  });
}

function registerAccount(){
  if(validateRegisterDetails()){
    register();
  }
}

function validateRegisterDetails(){
  // Check values are not empty.
  if(!checkEmptyRegisterForm()){
    alertBanner("Please fill out the entire form");
    console.log('empty fields');
    return false;
  }
  // Check for illegal characters in the form.
  if(!checkIllegalRegisterForm()){
    alertBanner("Illegal characters in input");
    console.log('illegal characters');
    return false;
  }
  // Checks for a valid email.
  if(!validateEmail($('input[name="registerEmail"').val())){
    alertBanner("Invalid email");
    console.log('invalid email');
    return false;
  }
  // Checks for valid postcode.
  if(!validatePostcode($('input[name="registerPostcode"').val())){
    alertBanner("Invalid postcode");
    console.log('invalid postcode');
    return false;
  }
  // Checks passwords match.
  if(($('input[name="registerPassword"').val() != $('input[name="registerPasswordConfirm"').val())){
    alertBanner("Passwords do not match");
    console.log("passwords do not match");
    return false;
  }
  // All validation checks pass.
  return true;

  //Check not empty
  //Check illegal characters
  // Check email is an email
  // DOB over 5 y/o
  // Postcode length
  // House number is a number
}

// Check email does not already exist.
function register(){
  $.ajax({
    // POST route in the routes js file.
    url: "/login/register",
    type: "POST",
    // Datatype that is expected
    dataType: "json",
    data: $('#registerForm').serialize(),
    success: function(returned){
      if (returned.exists){
        console.log("Email exists");
        alertBanner("Account with that email already exists");
      } else{
        console.log("insert complete");
      }
    },
    error: function(){
      console.log('fail');
    }
  });
}

function checkEmptyRegisterForm(){
  return !!($('input[name="registerFName"').val() &&
   $('input[name="registerSName"').val() && 
   $('input[name="registerEmail"').val() &&
   $('input[name="registerTelephone"').val() &&
   $('input[name="registerDOB"').val() &&
   $('input[name="registerPostcode"').val() &&
   $('input[name="registerHouseNo"').val() &&
   $('input[name="registerPassword"').val() &&
   $('input[name="registerPasswordConfirm"').val());
}

function checkIllegalRegisterForm(){
  return !!(validateInput($('input[name="registerFName"').val()) &&
   validateInput($('input[name="registerSName"').val()) &&
   validateInput($('input[name="registerEmail"').val()) &&
   validateInput($('input[name="registerTelephone"').val()) &&
   validateInput($('input[name="registerPostcode"').val()) &&
   validateInput($('input[name="registerHouseNo"').val()) &&
   validateInput($('input[name="registerPassword"').val()) &&
   validateInput($('input[name="registerPasswordConfirm"').val()));
}