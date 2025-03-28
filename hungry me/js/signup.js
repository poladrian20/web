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
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    console.log('Sign Up Data:', { email, password });
    // Add your sign-up logic here (e.g., API call to register the user)
});