document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded and script is running"); // Confirm script execution

    const button = document.createElement('button');
    button.textContent = 'Run Scanning';
    button.style.position = 'fixed'; // Make button always visible
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.zIndex = 1000; // make sure it's on top of other content
    button.style.padding = '10px'; 
    button.style.backgroundColor = 'red';

    document.body.appendChild(button);
    
    button.onclick = () => {
        try {
            chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
                console.log('Response:', response);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };
});
