let level = 1;
let score = 0;
let timeLeft = 60;
let currentAnswer = "";
let timerInterval;
let isMusicOn = true; // Music is ON by default
let isSoundOn = true; // Sound effects are ON by default

// Background Music
const backgroundMusic = new Audio("media/background-music.mp3"); // Replace with your music file
backgroundMusic.loop = true; // Make it loop continuously

// Sound Effects
const correctSound = new Audio("media/correct.mp3"); // Sound for correct answer
const wrongSound = new Audio("media/wrong.mp3"); // Sound for wrong answer

// Fetch question from Banana API
function fetchQuestion() {
    fetch("https://marcconrad.com/uob/banana/api.php?out=json")
        .then(response => response.json())
        .then(data => {
            if (data && data.question && data.solution) {
                document.getElementById("questionImage").src = data.question; // Display image
                currentAnswer = data.solution.toString().toLowerCase();
            } else {
                console.error("Invalid API response:", data);
            }
        })
        .catch(error => console.error("Error fetching question:", error));
}

// Start the game timer
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").innerText = timeLeft;
        } else {
            clearInterval(timerInterval);
            backgroundMusic.pause(); // ⏹ Stop music when time reaches zero
            backgroundMusic.currentTime = 0; // Reset music
            endGame(); // Call endGame() when timer reaches 0
        }
    }, 1000);
}

// End the game when time runs out
function endGame() {
    alert("⏳ Time's up! Game Over.");
    document.getElementById("answer").disabled = true;
    document.getElementById("submitButton").disabled = true;
    saveScore(); // Save final score
}

// Submit answer
function submitAnswer() {
    if (timeLeft <= 0) return;

    let userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    let messageBox = document.getElementById("messageBox");
    let message = document.getElementById("message");

    if (userAnswer === currentAnswer) {
        score += 10;
        timeLeft += 10; // Increase time
        message.innerText = "✅ Correct answer!";
        messageBox.className = "message-box correct"; // Apply green styling
        level++;
        document.getElementById("level").innerText = level;
        if (isSoundOn) correctSound.play(); // Play correct sound if enabled
    } else {
        timeLeft -= 5; // Reduce time
        message.innerText = "❌ Wrong answer, try again!";
        messageBox.className = "message-box wrong"; // Apply red styling
        if (isSoundOn) wrongSound.play(); // Play wrong sound if enabled
    }

    messageBox.style.display = "block"; // Show the message box
    document.getElementById("score").innerText = score;
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("answer").value = "";
    fetchQuestion(); // Get new question
}

// Toggle background music ON/OFF
function toggleMusic() {
    isMusicOn = !isMusicOn;
    if (isMusicOn) {
        backgroundMusic.play();
        document.getElementById("musicButton").innerText = "🎵 Music On";
    } else {
        backgroundMusic.pause();
        document.getElementById("musicButton").innerText = "🔇 Music Off";
    }
}

// Toggle sound effects ON/OFF
function toggleSound() {
    isSoundOn = !isSoundOn;
    document.getElementById("soundButton").innerText = isSoundOn ? "🔊 Sound Effects On" : "🔇 Sound Effects Off";
}

// Restart game
function restartGame() {
    window.location.reload(); // Reload the page to restart the game 
}

// Exit game
function exitGame() {
    clearInterval(timerInterval);
    saveScore();
    window.location.href = "leaderboard.html";
}

// Save score to database via game.php
function saveScore() {
    fetch("game.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `score=${score}`
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Error saving score:", error));
}

// Start game on page load
window.onload = function() {
    fetchQuestion();
    startTimer();
    backgroundMusic.play(); // Start background music
};
