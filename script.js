// Variables for the DOM elements
const wordElement = document.getElementById('word');
const scoreElement = document.getElementById('score');
const textElement = document.getElementById('text');
const timeElement = document.getElementById('time');
const endGameElement = document.getElementById('end-game-container');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');

// Array of words
const words = [
  "dependent", "dog", "superficial", "admit", "juice", "javascript",
  "developer", "airplane", "great", "fun", "manipulate", "cat", 
  "transition", "school", "computer", "programming", "drag", "loving", "north"
];

// Game Variables
let score = 0;
let time = 10; 
let timerInterval; 

// To get a random word from the words array
function addWordToDOM() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  wordElement.textContent = randomWord;
}

// To update the score
function updateScore() {
  score++;
  scoreElement.textContent = score;
}

// To update the timer
function updateTime() {
  time--;
  timeElement.textContent = `${time}s`;
  
  if (time <= 0) {
    clearInterval(timerInterval); 
    gameOver(); 
  }
}

// Game over
function gameOver() {
  endGameElement.innerHTML = `
    <h1>Game Over!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;
  endGameElement.style.display = 'flex'; 
}

// Event listener for input field
textElement.addEventListener('input', () => {
  const enteredText = textElement.value.trim();
  const currentWord = wordElement.textContent;
  
  if (enteredText === currentWord) {
    updateScore(); 
    addWordToDOM(); 
    textElement.value = ''; 
    time += 5; 
  }
});

// Start the timer
function startTimer() {
  
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Set interval to update the time
  timerInterval = setInterval(updateTime, 1000);
}

// To start the game
function startGame() {
  addWordToDOM(); // Display the first word
  startTimer(); // Start the timer
}

// Event listener for difficulty change
settingsForm.addEventListener('change', () => {
  const difficulty = difficultySelect.value;
  
  // Set time depending on difficulty
  if (difficulty === 'easy') {
    time = 15;
  } else if (difficulty === 'medium') {
    time = 10;
  } else if (difficulty === 'hard') {
    time = 5;
  }
  
  timeElement.textContent = `${time}s`; // Update the time display
  startGame(); // Restart the game with new settings
});

// Toggle visibility of settings menu
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

// Initialize the game on page load
window.addEventListener('DOMContentLoaded', () => {
  startGame();
});
