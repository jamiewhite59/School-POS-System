// Shows a selected modal.
export function open(element){
  let target = element.getAttribute("data-target");
  $(target).modal('show');
}

// Hides modal currently displaying.
export function close(element){
  let target = element.getAttribute("data-target");
  $(target).modal('hide');

}

