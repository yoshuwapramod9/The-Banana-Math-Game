function togglePassword(id) {
    const passwordField = document.getElementById(id);
    const toggleIcon = passwordField.nextElementSibling;
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.remove("bi-eye-slash");
        toggleIcon.classList.add("bi-eye");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.remove("bi-eye");
        toggleIcon.classList.add("bi-eye-slash");
    }
}


function showAlert(message, type) {
    let alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type} alert-dismissible fade show fixed-top text-center`;
    alertBox.style.marginTop = "20px";
    alertBox.style.zIndex = "9999";
    alertBox.style.width = "50%";
    alertBox.style.marginLeft = "auto";
    alertBox.style.marginRight = "auto";

    alertBox.innerHTML = `
        <strong>${type === 'success' ? 'Success' : 'Error'}!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

// Check for messages from PHP via URL parameters
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('message') && urlParams.has('type')) {
        showAlert(urlParams.get('message'), urlParams.get('type'));
    }
});
