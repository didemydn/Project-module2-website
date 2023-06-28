// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Project-Module2 JS imported successfully!");
});


document.addEventListener('DOMContentLoaded', function() {
  const connectButton = document.getElementById('connect-button');
  connectButton.addEventListener('click', function() {
     window.location.href = '/connect';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const connectButton = document.getElementById('profile-button');
  connectButton.addEventListener('click', function() {
     window.location.href = '/connect/profile';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const connectButton = document.getElementById('logout-button');
  connectButton.addEventListener('click', function() {
     window.location.href = '/';
  });
});
