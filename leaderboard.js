// Fetch leaderboard data
function loadLeaderboard() {
    fetch("leaderboard.php")
        .then(response => response.json())
        .then(data => {
            let tbody = document.getElementById("leaderboard-body");
            tbody.innerHTML = "";

            data.forEach((player, index) => {
                let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${player.username}</td>
                    <td>${player.score}</td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error loading leaderboard:", error));
}

// Redirect to game page
function goToGame() {
    window.location.href = "game.html";
}

// Logout function
function logout() {
    fetch("logout.php")
        .then(() => window.location.href = "login.html");
}

// Load leaderboard on page load
window.onload = loadLeaderboard;
