document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Store user credentials in localStorage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        alert("Signup successful! Redirecting to login...");
        window.location.href = "login.html"; // Redirect to login page
    });
});
