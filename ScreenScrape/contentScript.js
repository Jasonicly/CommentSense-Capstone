// contentScript.js
document.addEventListener('DOMContentLoaded', function() {
    const button = document.createElement('button');
    button.textContent = 'Test Message';
    document.body.appendChild(button);
    button.onclick = () => {
      try {
        chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
          console.log(response);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };
  });
  