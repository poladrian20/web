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

        // Admin Credentials (Hardcoded)
        if (email === "admin@email.com" && password === "admin123") {
            alert("Login successful! Redirecting to Admin dashboard...");
            window.location.href = "dashboard.html";
        } 
        // User Credentials (Saved via Signup)
        else if (email === storedEmail && password === storedPassword) {
            alert("Login successful! Redirecting to User dashboard...");
            window.location.href = "recent_orders.html"; // Change this to the actual user page
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


document.addEventListener("DOMContentLoaded", function () {
    const shopSelect = document.getElementById("shop-select");
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    // Define specific credentials for each shop
    const shopCredentials = {
        shop1: { email: "mangpeping@email.com", password: "mangpeping123" },
        shop2: { email: "matutina@email.com", password: "matutina123" },
        shop3: { email: "ciudadelmina@email.com", password: "ciudadelmina123" }
    };
    
    shopSelect.addEventListener("change", function () {
        const selectedShop = shopSelect.value;
        
        if (selectedShop === "shop1") {
            emailInput.placeholder = "Enter email for Mang Peping";
            passwordInput.placeholder = "Enter password for Mang Peping";
        } else if (selectedShop === "shop2") {
            emailInput.placeholder = "Enter email for Matutina-Gerry's";
            passwordInput.placeholder = "Enter password for Matutina-Gerry's";
        } else if (selectedShop === "shop3") {
            emailInput.placeholder = "Enter email for Ciudad Elmina";
            passwordInput.placeholder = "Enter password for Ciudad Elmina";
        }
    });
    
    
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const selectedShop = shopSelect.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (!selectedShop) {
            alert("Please select a shop before logging in.");
            return;
        }
        
        if (
            shopCredentials[selectedShop] &&
            email === shopCredentials[selectedShop].email &&
            password === shopCredentials[selectedShop].password
        ) {
            alert(`Login successful! Redirecting to ${selectedShop} page...`);
            window.location.href = `recent_orders.html`;
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
    
    const adminLoginForm = document.getElementById("admin-login-form");
    adminLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const adminEmail = document.getElementById("admin-email").value;
        const adminPassword = document.getElementById("admin-password").value;
        
        if (adminEmail === "admin@email.com" && adminPassword === "admin123") {
            alert("Login successful! Redirecting to Admin dashboard...");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Admin credentials. Please try again.");
        }
    });
});



