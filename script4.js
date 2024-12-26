// ✅ DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// ✅ Add Message to Chat
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
    scrollProof(); // Ensure scrolling stays at the bottom
}

// ✅ Fetch DuckDuckGo API for General Queries
async function fetchDuckDuckGo(query) {
    try {
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
        if (!response.ok) throw new Error('Failed to fetch DuckDuckGo API.');
        const data = await response.json();
        return data.AbstractText || "I couldn't find an answer. Try something else!";
    } catch (error) {
        console.error('DuckDuckGo Error:', error);
        return "Error fetching DuckDuckGo response.";
    }
}

// ✅ Solve Math Expressions
function solveMath(query) {
    try {
        return eval(query); // Use cautiously!
    } catch {
        return "I couldn't solve that. Try rephrasing!";
    }
}

// ✅ Get a Random Joke
function getJoke() {
    const jokes = [
        "Why don’t skeletons fight each other? They don’t have the guts.",
        "Why don’t scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? Because he was outstanding in his field."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// ✅ Get Song Lyrics
function getSongLyrics() {
    return `🎵 Future - Cinderella 🎵\n\nRacks on, racks stuck together\nSip red, talk to the devil...\n[Snippet only]`;
}

// ✅ Talk About Cinderella
function talkAboutCinderella() {
    return "👸 Cinderella isn’t just about the past; in the future, she’s running a startup producing AI-powered glass slippers! What a glow-up!";
}

// ✅ Talk About the Future
function talkAboutFuture() {
    return "🔮 The future is full of wonders: AI companions, flying cars, and vacations to Mars! Exciting, right?";
}

// ✅ Check for Greeting
function isGreeting(message) {
    const greetings = ["hi", "hello", "hey", "greetings", "what's up", "howdy"];
    return greetings.some(greet => message.toLowerCase().includes(greet));
}

// ✅ Handle User Input and Generate Response
async function handleInput(userMessage) {
    if (isGreeting(userMessage)) {
        return "Hello! I'm your chatbot 🤖. How can I help you?";
    } else if (userMessage.toLowerCase().includes("joke")) {
        return getJoke();
    } else if (userMessage.toLowerCase().includes("sing a song")) {
        return getSongLyrics();
    } else if (userMessage.toLowerCase().includes("cinderella")) {
        return talkAboutCinderella();
    } else if (userMessage.toLowerCase().includes("future")) {
        return talkAboutFuture();
    } else if (!isNaN(parseFloat(userMessage.charAt(0)))) {
        return solveMath(userMessage);
    } else {
        return await fetchDuckDuckGo(userMessage);
    }
}

// ✅ Send Message
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Add User Message
    addMessage('user', `You: ${userMessage}`);
    userInput.value = ''; // Clear input field
    userInput.focus(); // Refocus on input box

    // Show "Bot is typing..." Placeholder
    addMessage('bot', '🤖 Bot is typing...');

    // Simulate Delay and Fetch Response
    setTimeout(async () => {
        const botResponse = await handleInput(userMessage);
        chatMessages.lastChild.innerText = `🤖 Bot: ${botResponse}`;
        scrollProof(); // Ensure scrolling stays at the bottom
    }, 1000);
}

// ✅ Handle Enter Key
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ✅ Initial Welcome Message
document.addEventListener('DOMContentLoaded', () => {
    addMessage('bot', '🤖 Hello! Ask me anything.');
    userInput.focus(); // Ensure focus starts on input box
});

// ✅ Scroll-Proof Functionality
function scrollProof() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
