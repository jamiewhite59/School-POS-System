$(document).ready(function(){
  console.log('ready');
  $('.menu-button').on('click', function(){
    if(!$(".menu-button").is(":checked")){
        $(".listContainer").css("opacity", "0")
    }
    else{
      $(".listContainer").css("opacity", "1")
    }
  });
  
});
