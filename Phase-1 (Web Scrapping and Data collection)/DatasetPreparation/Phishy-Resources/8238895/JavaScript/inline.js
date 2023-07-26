
const input1 = document.getElementById('username');
const input2 = document.getElementById('password');
const submitBtn = document.getElementById('log_in');

input1.addEventListener('keyup', handleInputChange);
input2.addEventListener('keyup', handleInputChange);

// Add event listener to the page load event
document.addEventListener('DOMContentLoaded', handleInputChange);

// Function to handle input changes
function handleInputChange() {
  // Check if both input fields have values
  if (input1.value.trim() !== '' && input2.value.trim() !== '') {
    submitBtn.removeAttribute('disabled'); // Enable the submit button
  } else {
    submitBtn.setAttribute('disabled', true); // Disable the submit button
  }
}

const passwordField = document.getElementById('password');
const showPasswordBtn = document.getElementById('showPasswordBtn');
const eyeIcon = document.getElementById('eyeIcon');

showPasswordBtn.addEventListener('click', function() {
  const type = passwordField.getAttribute('type');
  passwordField.setAttribute('type', type === 'password' ? 'text' : 'password');
  eyeIcon.classList.toggle('fa-fa-eye-hide');
});

