<?php
$conn = new mysqli("localhost", "root", "", "banana_game");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch top scores (sorted)
$sql = "SELECT username, score FROM scores ORDER BY score DESC LIMIT 5";
$result = $conn->query($sql);

$scores = [];
while ($row = $result->fetch_assoc()) {
    $scores[] = $row;
}

echo json_encode($scores);

$conn->close();
?>
