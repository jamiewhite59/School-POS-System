function login(){
  if (validateLoginDetails()){
    checkLogin();
  } 
}

// Validate the details in the login form.
function validateLoginDetails(){
  // Check inputs are not empty.
  if($('input[name="email"').val() && $('input[name="password"').val()){
    // Validate each input box.
    if(validateInput($('input[name="email"]').val()) && validateInput($('input[name="password"').val())){
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

// Alert banner displayed inside the pre-determined conatainer.
function alertBanner(message){
  // Alert banner already exists.
  if($('#alertBanner')[0]){
    // Remove the timeout for the existing banner.
    clearTimeout(bannerTimeout);
    // Remove the existing banner.
    $('#alertBanner')[0].remove();
  }
  // Creating the banner and the content for it.
  var wrapper = document.createElement('div');
  wrapper.innerHTML = '<div id="alertBanner" class="alert alert-danger alert-dismissible fade show">'
  + '<strong> Error: </strong>'+message
  + '<button type="button" class="btn-close" onclick="closeAlert(this)" data-bs-dismiss="alert"></button></div>';

  docReady(() => {
    let errorContainer = document.querySelector('.errorContainer');
    // Adds the banner to the container on the page.
    errorContainer.append(wrapper);
    // Banner will be removed in 3 seconds.
    bannerTimeout = setTimeout(function(){
      errorContainer.innerHTML = "";
    }, 3000);
  });
}

// Validates a string
function validateInput(input){
  return !input.match(/[|;$%"<>()+]/g);
}

// Closes the alert.
function closeAlert(event){
  event.parentNode.remove();
}

function docReady(fn){
  if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}