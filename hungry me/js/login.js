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

// Shop and Admin Login Logic
document.addEventListener("DOMContentLoaded", function () {
    const shopSelect = document.getElementById("shop-select");
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Define shop credentials and redirect pages
    const shopCredentials = {
        shop1: { 
            email: "mangpeping@email.com", 
            password: "mangpeping123", 
            redirect: "mangpeping.html" 
        },
        shop2: { 
            email: "matutina@email.com", 
            password: "matutina123", 
            redirect: "matutina.html" 
        },
        shop3: { 
            email: "ciudadelmina@email.com", 
            password: "ciudadelmina123", 
            redirect: "ciudadelmina.html" 
        }
    };

    // Update placeholders based on shop selection
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
        } else {
            emailInput.placeholder = "Enter email";
            passwordInput.placeholder = "Enter password";
        }
    });

    // Shop login form submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const selectedShop = shopSelect.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!selectedShop) {
            alert("Please select a shop before logging in.");
            return;
        }

        const shop = shopCredentials[selectedShop];
        if (shop && email === shop.email && password === shop.password) {
            alert(`Login successful! Redirecting to ${shopSelect.options[shopSelect.selectedIndex].text} page...`);
            window.location.href = shop.redirect;
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });

    // Admin login form submission
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