// Initialize variables
let flashcards = [];
let correctCount = 0;
let streakCount = 0;
let highScore = localStorage.getItem('highScore') || 0;
let currentCard = null;

// DOM Elements
const correctCounter = document.getElementById('correct-counter');
const streakCounter = document.getElementById('streak-counter');
const highScoreDisplay = document.getElementById('high-score');
const fireAnimation = document.getElementById('fire-animation');
const quizCard = document.getElementById('quiz-card');
const quizQuestion = document.getElementById('quiz-question');
const quizAnswer = document.getElementById('quiz-answer');
const quizFeedback = document.getElementById('quiz-feedback');
const gameOverDisplay = document.getElementById('game-over');

// Display high score on load
highScoreDisplay.innerText = highScore;



// Add Flashcard Without Alert
document.getElementById('add-flashcard').addEventListener('click', () => {
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    if (question && answer) {
        flashcards.push({ question, answer });
        
        // Clear input fields for next entry
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';

        // Provide Visual Feedback
        const feedback = document.getElementById('quiz-feedback');
        feedback.textContent = "✅ Flashcard Added!";
        feedback.classList.add('correct-answer');

        setTimeout(() => {
            feedback.textContent = '';
            feedback.classList.remove('correct-answer');
        }, 1500);
    } else {
        const feedback = document.getElementById('quiz-feedback');
        feedback.textContent = "❌ Please fill in both fields!";
        feedback.classList.add('highlight');

        setTimeout(() => {
            feedback.textContent = '';
            feedback.classList.remove('highlight');
        }, 1500);
    }
});

// Add Flashcard Without Duplicates
// Add Flashcard Without Duplicates
document.getElementById('add-flashcard').addEventListener('click', () => {
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    if (question && answer) {
        // Check for duplicate question or answer
        const isDuplicate = flashcards.some(
            (card) => card.question.toLowerCase() === question.toLowerCase() || 
                      card.answer.toLowerCase() === answer.toLowerCase()
        );

        if (isDuplicate) {
            const feedback = document.getElementById('quiz-feedback');
            feedback.textContent = "❌ Duplicate question or answer!";
            feedback.classList.add('highlight');

            setTimeout(() => {
                feedback.textContent = '';
                feedback.classList.remove('highlight');
            }, 1500);
        } else {
            // Add the flashcard if no duplicates found
            flashcards.push({ question, answer });

            // Clear input fields
            document.getElementById('question').value = '';
            document.getElementById('answer').value = '';

            // Provide Success Feedback
            const feedback = document.getElementById('quiz-feedback');
            feedback.textContent = "✅ Flashcard Added!";
            feedback.classList.add('correct-answer');

            setTimeout(() => {
                feedback.textContent = '';
                feedback.classList.remove('correct-answer');
            }, 1500);
        }
    } else {
        // Handle empty fields
        const feedback = document.getElementById('quiz-feedback');
        feedback.textContent = "❌ Please fill in both fields!";
        feedback.classList.add('highlight');

        setTimeout(() => {
            feedback.textContent = '';
            feedback.classList.remove('highlight');
        }, 1500);
    }
});



// Start Quiz
document.getElementById('start-quiz').addEventListener('click', startQuiz);

function startQuiz() {
  if (flashcards.length === 0) {
    alert('No flashcards available. Add some first!');
    return;
  }
  gameOverDisplay.classList.add('hidden');
  loadNextQuestion();
}

// Load Next Question
function loadNextQuestion() {
  const randomIndex = Math.floor(Math.random() * flashcards.length);
  currentCard = flashcards[randomIndex];

  quizQuestion.innerText = currentCard.question;
  quizCard.classList.remove('hidden');
  quizFeedback.innerText = '';
  quizAnswer.value = '';
}


// Submit Answer
document.getElementById('submit-answer').addEventListener('click', () => {
    const userAnswer = quizAnswer.value.trim();
    if (!currentCard) return;

    if (userAnswer.toLowerCase() === currentCard.answer.toLowerCase()) {
        correctCount++;
        streakCount++;
        quizFeedback.innerText = '✅ Correct!';
        fireAnimation.classList.remove('hidden');
        setTimeout(() => fireAnimation.classList.add('hidden'), 1000);

        // Show Dancing Robot
        showDancingRobot();

        if (streakCount >= 3) {
            streakCounter.classList.add('highlight');
        }
        loadNextQuestion();
    } else {
        gameOver();
    }

    // Update counters
    correctCounter.innerText = correctCount;
    streakCounter.innerText = streakCount;

    if (streakCount > highScore) {
        highScore = streakCount;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.innerText = highScore;
    }
});

// 🎵 Show Dancing Robot and Switch Images
function showDancingRobot() {
    const robotContainer = document.getElementById('robot-container');
    const robotImage = document.getElementById('dancing-robot');

    let isImageOne = true; // Toggle between danceimage1 and danceimage2

    // Make robot visible
    robotContainer.style.display = 'block';

    // Switch images every 300ms
    const danceInterval = setInterval(() => {
        robotImage.src = isImageOne ? './IMAGES/dance2-removebg-preview.png' : './IMAGES/dance1-removebg-preview.png';
        isImageOne = !isImageOne;
    }, 300);

    // Hide robot after 3 seconds
    setTimeout(() => {
        clearInterval(danceInterval);
        robotContainer.style.display = 'none';
        robotImage.src = './IMAGES/dance1-removebg-preview.png'; // Reset to default image
    }, 3000);
}

// 🎯 Correct Answer Handler
function handleCorrectAnswer() {
    const feedback = document.getElementById('quiz-feedback');
    feedback.textContent = "Correct! 🎉";
    feedback.classList.add('correct-answer');

    // Show dancing robot
    showDancingRobot();

    // Remove glow effect after animation
    setTimeout(() => {
        feedback.classList.remove('correct-answer');
    }, 1500);
}


// Game Over
function gameOver() {
  quizFeedback.innerText = `❌ Incorrect. Correct Answer: ${currentCard.answer}`;
  quizCard.classList.add('hidden');
  gameOverDisplay.classList.remove('hidden');
  streakCount = 0;
  streakCounter.classList.remove('highlight');
}




