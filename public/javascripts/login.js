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
    url: "/login/login",
    type: "POST",
    dataType: "json",
    data: $('#loginForm').serialize(),
    success: function(returned){
      if(returned.length == 1){
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
    clearTimeout(bannerTimeout);
    $('#alertBanner')[0].remove();
  }
  var wrapper = document.createElement('div');
  wrapper.innerHTML = '<div id="alertBanner" class="alert alert-danger alert-dismissible fade show">'
  + '<strong> Error: </strong>'+message
  + '<button type="button" class="btn-close" onclick="closeAlert(this)" data-bs-dismiss="alert"></button></div>';

  docReady(() => {
    let errorContainer = document.querySelector('.errorContainer');
    errorContainer.append(wrapper);
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