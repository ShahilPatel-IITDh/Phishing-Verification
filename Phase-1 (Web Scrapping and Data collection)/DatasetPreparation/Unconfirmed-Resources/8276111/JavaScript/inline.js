
const transitioningDiv = document.querySelector('.transitioning');
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {

  transitioningDiv.classList.add('spinner');
  transitioningDiv.classList.remove('hide');
  event.preventDefault();
  setTimeout(function() {
    form.submit();
  }, 2000);
});

  