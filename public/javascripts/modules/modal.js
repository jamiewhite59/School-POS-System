// Shows a selected modal.
function open(element){
  let target = element.getAttribute("data-target");
  $(target).modal('show');
}

// Hides modal currently displaying.
function close(element){
  let target = element.getAttribute("data-target");
  $(target).modal('hide');

}

