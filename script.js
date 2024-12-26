// Eye Follow Cursor Logic
const eyes = document.querySelectorAll('.eye');

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;

        const maxMove = 10; // Limit the movement
        const moveX = Math.min(Math.max(deltaX / 10, -maxMove), maxMove);
        const moveY = Math.min(Math.max(deltaY / 10, -maxMove), maxMove);

        eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });


});

// Chat bubble element
const chatBubble = document.getElementById('chat-bubble');

// Initial Greeting
function displayGreeting() {
    chatBubble.textContent = "Hi, my name is Virk.io, here to assist you.";
}

// Fetch motivational quotes from Advice Slip API
async function fetchMotivationalQuote() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Validate and display advice
        if (data && data.slip && data.slip.advice) {
            chatBubble.textContent = `"${data.slip.advice}"`;
        } else {
            chatBubble.textContent = "Stay positive and keep going!";
        }
    } catch (error) {
        console.error('Error fetching quote:', error.message);
        chatBubble.textContent = "Keep pushing forward!";
    }
}

// Show initial greeting
displayGreeting();

// Start showing quotes after 10 seconds
setTimeout(() => {
    fetchMotivationalQuote(); // Show the first quote after 10 seconds

    // Show a new quote every 10 seconds
    setInterval(fetchMotivationalQuote, 10000);
}, 10000);

