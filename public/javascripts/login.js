function login(){
  if (validateLoginDetails()){
    console.log("here");
  } else{
    alertBanner("hello there");
  }

}

function validateLoginDetails(){
  if($('input[name="username"').val() && $('input[name="password"').val()){
    if(validateInput($('input[name="username"]'))){
      if(validateInput($('input[name="password"').val())){
        return true;
      }
    }
  }
  else{
    console.log("no value");
  }
  console.log($('input[name="username"]').val());
  return false;
}

function checkLogin(){
  return false;
}

function alertBanner(message){
  console.log("banner");
  if($('#alertBanner')[0]){
    console.log("exists");
    $('#alertBanner')[0].remove();
  }
  var wrapper = document.createElement('div');
  wrapper.innerHTML = '<div id="alertBanner" class="alert alert-danger alert-dismissible fade show">'
  + '<strong> Error: </strong>'+message
  + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';

  docReady(() => {
    let errorContainer = document.querySelector('.errorContainer');
    errorContainer.append(wrapper);
    bannerTimeout = setTimeout(function(){
      errorContainer.innerHTML = "";
    }, 3000);
  });
}

function validateInput(input){
  console.log("validate");
  return false;
}


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