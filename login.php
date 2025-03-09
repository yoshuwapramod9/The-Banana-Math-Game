<?php
session_start();
$conn = new mysqli("localhost", "root", "", "banana_game");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['username'] = $user['username'];
        header("Location: play.html?message=Login successful! Welcome&type=success");
        exit();
    } else {
        header("Location: login.html?message=Incorrect password&type=danger");
        exit();
    }
} else {
    header("Location: login.html?message=User not found&type=danger");
    exit();
}

$stmt->close();
$conn->close();
?>
