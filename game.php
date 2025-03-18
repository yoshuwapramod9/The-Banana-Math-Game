<?php
session_start();
$conn = new mysqli("localhost", "root", "", "banana_game");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!isset($_SESSION['username'])) {
    echo "User  not logged in.";
    exit();
}

$username = $_SESSION['username'];
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;

// Insert score into database
$sql = "INSERT INTO scores (username, score) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $username, $score);

if ($stmt->execute()) {
    echo "Score saved successfully.";
} else {
    echo "Error saving score.";
}

$stmt->close();
$conn->close();
?>