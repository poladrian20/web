const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

// Toggle between forms
registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

// Mock user database (Replace with actual database logic)
const users = {
    "admin@email.com": { role: "admin", password: "password123" },
    "owner@email.com": { role: "owner", password: "password123" } 
};

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const adminLoginForm = document.getElementById("admin-login-form");

    // ✅ Handle Shop Owner Login
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (users[email] && users[email].password === password) {
                localStorage.setItem("loggedInUser", email); 

                if (users[email].role === "admin") {
                    window.location.href = "dashboard.html";
                } else if (users[email].role === "owner") {
                    window.location.href = "restaurant.html"; // ✅ Fixed filename
                }
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // ✅ Handle Admin Login
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const adminEmail = document.getElementById("admin-email").value;
            const adminPassword = document.getElementById("admin-password").value;

            if (users[adminEmail] && users[adminEmail].password === adminPassword) {
                localStorage.setItem("loggedInUser", adminEmail);
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid admin email or password.");
            }
        });
    }

    // ✅ Check Authentication on Add Menu Page
    if (window.location.pathname.includes("add_menu.html")) { // ✅ Fixed filename
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            window.location.href = "login.html"; // ✅ Redirect to login if not logged in
        }
    }
});
