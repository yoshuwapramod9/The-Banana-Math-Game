<?php
session_start();
$conn = new mysqli("localhost", "root", "", "banana_game");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Check if username already exists
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    header("Location: register.html?message=Username already exists&type=danger");
    exit();
}

// Insert new user
$sql = "INSERT INTO users (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    header("Location: login.html?message=Registration successful! Please login&type=success");
} else {
    header("Location: register.html?message=Error registering user&type=danger");
}

$stmt->close();
$conn->close();
?>
