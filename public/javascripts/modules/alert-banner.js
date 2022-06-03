// Variable to track timeout of current banner.
// Allows it to be cleared if another banner replaces a current one.
var bannerTimeout;

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
  + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';

  docReady(() => {
    let errorContainer = document.querySelector('.alertContainer');
    // Adds the banner to the container on the page.
    errorContainer.append(wrapper);
    // Banner will be removed in 3 seconds.
    bannerTimeout = setTimeout(function(){
      errorContainer.innerHTML = "";
    }, 3000);
  });
}

function docReady(fn){
  if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}