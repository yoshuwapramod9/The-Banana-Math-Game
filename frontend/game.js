let level = 1;
let score = 0;
let timeLeft = 60;
let currentAnswer = "";
let timerInterval;
let isMusicOn = true; // Music is ON by default
let isSoundOn = true; // Sound effects are ON by default

// Background Music
const backgroundMusic = new Audio("background-music.mp3"); // Replace with your music file
backgroundMusic.loop = true; // Make it loop continuously

// Sound Effects
const correctSound = new Audio("correct.mp3"); // Sound for correct answer
const wrongSound = new Audio("wrong.mp3"); // Sound for wrong answer

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
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").innerText = timeLeft;
        } else {
            clearInterval(timerInterval);
            alert("Time's up! Game Over.");
            saveScore();
        }
    }, 1000);
}

// Submit answer
function submitAnswer() {
    let userAnswer = document.getElementById("answer").value.trim().toLowerCase();

    if (userAnswer === currentAnswer) {
        score += 10;
        timeLeft += 20; // Increase time
        document.getElementById("message").innerText = "✅ Correct answer!";
        document.getElementById("message").style.color = "green";
        level++;
        document.getElementById("level").innerText = level;
        if (isSoundOn) correctSound.play(); // Play correct sound if enabled
    } else {
        timeLeft -= 15; // Reduce time
        document.getElementById("message").innerText = "❌ Wrong answer, try again!";
        document.getElementById("message").style.color = "red";
        if (isSoundOn) wrongSound.play(); // Play wrong sound if enabled
    }

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
    clearInterval(timerInterval);
    level = 1;
    score = 0;
    timeLeft = 60;
    document.getElementById("level").innerText = level;
    document.getElementById("score").innerText = score;
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").value = "";
    fetchQuestion();
    startTimer();
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
