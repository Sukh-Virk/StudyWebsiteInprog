

// 🤖 Bot Animation Controls
const botImage = document.getElementById('bot-image');
const botImages = [
    './IMAGES/studying2-removebg-preview.png',
    './IMAGES/file.png',
    './IMAGES/sukbot.png'
]; // Array of bot images

let botAnimationInterval;
let botImageIndex = 0;

// ✅ Start Continuous Bot Animation
function startBotAnimation() {
    if (botAnimationInterval) return; // Prevent multiple intervals
    botAnimationInterval = setInterval(() => {
        botImageIndex = (botImageIndex + 1) % botImages.length; // Cycle through images
        botImage.src = botImages[botImageIndex];
    }, 1000); // Switch every second
}

// ✅ Stop Bot Animation (Optional)
function stopBotAnimation() {
    clearInterval(botAnimationInterval);
    botAnimationInterval = null;
    botImage.src = botImages[0]; // Reset to the first image
}

// ✅ Start Animation on Page Load
window.onload = startBotAnimation;




// 🎵 Music Controls
const youtubePlayer = document.getElementById('youtube-player');
const playCalmRadioButton = document.getElementById('play-calm-radio');
const playRapRadioButton = document.getElementById('play-rap-radio');
const pauseMusicButton = document.getElementById('pause-music');
const timerMessage = document.getElementById('timer-message');

// 🕒 Timer Controls
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const resetButton = document.getElementById('reset-timer');

// 🔊 Alarm Sounds
const alarmAudio = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Alarm for work end
const breakAudio = new Audio('https://www.soundjay.com/button/beep-08b.wav'); // Alarm for break end

// 🎆 Firework Animations
const fireworksContainer = document.createElement('div');
fireworksContainer.id = 'fireworks';
document.body.appendChild(fireworksContainer);

// 🕒 Timer State Variables
let timerInterval;
let timeLeft = 25 * 60; // Default: 25 minutes
let isRunning = false;
let isBreakTime = false;

// ✅ Start Timer
function startTimer() {
    if (isRunning) return; // Prevent multiple intervals
    isRunning = true;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        updateTimerColor(minutes);
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            if (isBreakTime) {
                breakAudio.play(); // Alarm for break end
                showFireworks(); // Fireworks animation
                resetToWorkSession(); // Automatically switch back to work session
            } else {
                alarmAudio.play(); // Alarm for work end
                showFireworks(); // Fireworks animation
                startBreakSession(); // Automatically switch to break session
            }
        }
    }, 1000);
}

// ✅ Pause Timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// ✅ Reset Timer
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 25 * 60; // Reset to 25 minutes
    timerDisplay.textContent = '25:00';
    timerDisplay.style.color = 'white';
    timerMessage.textContent = '⏳ Time to focus!';
    isRunning = false;
    isBreakTime = false;
    clearFireworks();
}

// ✅ Start Break Session Automatically
function startBreakSession() {
    isBreakTime = true; // Switch state to break
    timeLeft = 5 * 60; // Set break timer to 5 minutes
    timerDisplay.textContent = '05:00';
    timerMessage.textContent = '🛀 Take a break!';
    timerDisplay.style.color = 'lightblue';
    isRunning = false;
    startTimer(); // Automatically start the break timer
}

// ✅ Reset to Work Session Automatically
function resetToWorkSession() {
    isBreakTime = false; // Switch state to work
    timeLeft = 25 * 60; // Reset to 25-minute focus timer
    timerDisplay.textContent = '25:00';
    timerMessage.textContent = '⏳ Time to focus!';
    timerDisplay.style.color = 'white';
    isRunning = false;
    startTimer(); // Automatically start the work timer
}

// ✅ Timer Color Changes Based on Time Left
function updateTimerColor(minutes) {
    if (minutes <= 5) {
        timerDisplay.style.color = 'red'; // Final 5 minutes
    } else if (minutes <= 10) {
        timerDisplay.style.color = 'yellow'; // Final 10 minutes
    } else {
        timerDisplay.style.color = 'white'; // Default color
    }
}

// ✅ Firework Animations
function showFireworks() {
    fireworksContainer.innerHTML = `
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
    `;
    fireworksContainer.style.display = 'block';
    setTimeout(() => {
        clearFireworks();
    }, 5000); // Clear fireworks after 5 seconds
}

function clearFireworks() {
    fireworksContainer.innerHTML = '';
    fireworksContainer.style.display = 'none';
}

// ✅ Music Functions
function playYouTubeMusic(videoId, label) {
    youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
    youtubePlayer.style.display = 'block';
    timerMessage.textContent = `🎧 Now Playing: ${label}`;
}

function pauseYouTubeMusic() {
    youtubePlayer.src = '';
    youtubePlayer.style.display = 'none';
    timerMessage.textContent = '⏸️ Music Paused';
}

// ✅ Event Listeners
startButton.onclick = startTimer;
pauseButton.onclick = pauseTimer;
resetButton.onclick = resetTimer;

// ✅ Play Calm Radio
playCalmRadioButton.onclick = () => playYouTubeMusic('jfKfPfyJRdk', 'Calm Radio');

// ✅ Play Rap Radio
playRapRadioButton.onclick = () => playYouTubeMusic('Lq1D9P2vUOE', 'Rap Music Live Stream');

// ✅ Pause Music
pauseMusicButton.onclick = pauseYouTubeMusic;


