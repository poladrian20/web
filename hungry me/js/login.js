// Toggle between forms
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Retrieve stored user credentials from signup
        let storedEmail = localStorage.getItem("userEmail");
        let storedPassword = localStorage.getItem("userPassword");

        // Shop Owner Credentials (Hardcoded)
        if (email === "shopowner@email.com" && password === "owner123") {
            alert("Login successful! Redirecting to ShopOwner page...");
            window.location.href = "recent_orders.html";
        } 
        // Admin Credentials (Hardcoded)
        else if (email === "admin@email.com" && password === "admin123") {
            alert("Login successful! Redirecting to Admin dashboard...");
            window.location.href = "dashboard.html";
        } 
        // User Credentials (Saved via Signup)
        else if (email === storedEmail && password === storedPassword) {
            alert("Login successful! Redirecting to User dashboard...");
            window.location.href = "recent_orders.html"; // Change this to the actual user page
        } 
        // Invalid Credentials
        else {
            alert("Invalid credentials. Please try again.");
        }
    });

    document.getElementById("admin-login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById("admin-email").value;
        let password = document.getElementById("admin-password").value;

        if (email === "admin@email.com" && password === "admin123") {
            alert("Login successful! Redirecting to Admin dashboard...");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Admin credentials. Please try again.");
        }
    });
});



