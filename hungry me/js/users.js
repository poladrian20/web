// Sidebar toggle functions
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit");
    const deleteButtons = document.querySelectorAll(".delete");
    const checkIcons = document.querySelectorAll(".check-icon");
    const deleteIcons = document.querySelectorAll(".delete-icon");
    const viewIcons = document.querySelectorAll(".view-icon");
    const submenuToggles = document.querySelectorAll(".sidebar .toggle");
    const submenuItems = document.querySelectorAll(".submenu-item");
    const userLabel = document.querySelector(".clickable-label");
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");

    // ✅ Edit button functionality
    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Edit functionality not implemented yet.");
        });
    });

    // ✅ Delete row when clicking delete button
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => deleteRow(button));
    });

    // ✅ Delete row when clicking the trash (SVG delete icon)
    deleteIcons.forEach(icon => {
        icon.addEventListener("click", () => deleteRow(icon));
    });

    // ✅ Toggle row highlight when clicking the check (SVG check icon)
    checkIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            let row = icon.closest("tr");
            row.classList.toggle("checked-row");
        });
    });

    // ✅ Function to delete a row
    function deleteRow(element) {
        if (confirm("Are you sure you want to delete this user?")) {
            const row = element.closest("tr");
            if (row) row.remove();
        }
    }

    viewIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const row = icon.closest("tr");
            const username = row.children[1].textContent.trim().toLowerCase();
            
            // Define correct pages for each user
            const userPages = {
                "jhed221": "view_orders.html",
                "ugoy@54": "view_orders.html",
                "paul": "view_orders.html"
            };
            
            // Redirect based on username or default page
            window.location.href = userPages[username] || "view_orders.html";
        });
    });
    
    // ✅ Toggle submenu visibility only if submenu exists
    submenuToggles.forEach(toggle => {
        toggle.addEventListener("click", event => {
            const submenu = toggle.nextElementSibling;
            if (submenu && submenu.classList.contains("submenu")) {
                event.preventDefault();
                submenu.style.display = submenu.style.display === "block" ? "none" : "block";
            }
        });
    });

    // ✅ Toggle submenu item selection
    submenuItems.forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault();
            item.classList.toggle("active");
        });
    });

    // ✅ Redirect to users.html when clicking "All Users" label
    if (userLabel) {
        userLabel.addEventListener("click", () => {
            window.location.href = "menu.html";
        });
    }

    // ✅ Profile dropdown toggle
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener("click", () => {
            profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", (event) => {
            if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.style.display = "none";
            }
        });
    }

    // ✅ Function to get query parameter from URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // ✅ Approval process for shop owner
    function approveUser() {
        sessionStorage.setItem("approved", "true");
        alert("User approved! Redirecting to the main website.");
        window.location.href = "main_website.html";
    }

    function rejectUser() {
        sessionStorage.removeItem("pendingApproval");
        alert("User rejected. Access denied.");
        window.location.href = "login.html";
    }

    // Add event listeners to approve/reject buttons
    const approveButton = document.getElementById("approve-user");
    const rejectButton = document.getElementById("reject-user");

    if (approveButton) {
        approveButton.addEventListener("click", approveUser);
    }
    if (rejectButton) {
        rejectButton.addEventListener("click", rejectUser);
    }

    // Get username from URL and display user details
    const username = getQueryParam("username");
    if (username && document.getElementById("username")) {
        document.getElementById("username").textContent = username;
        
        // Mock data - Replace this with real data
        const userDatabase = {
            "Jhed221": { email: "jhed33@gmail.com", role: "JJJ" }
        };
        
        if (userDatabase[username]) {
            document.getElementById("email").textContent = userDatabase[username].email;
            document.getElementById("role").textContent = userDatabase[username].role;
        } else {
            document.getElementById("email").textContent = "Not found";
            document.getElementById("role").textContent = "Not found";
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Select all check (approve) and delete (reject) icons
    const approveIcons = document.querySelectorAll(".check-icon");
    const deleteIcons = document.querySelectorAll(".delete-icon");

    // Approve user function
    approveIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const row = this.closest("tr"); // Get the row
            const email = row.cells[1].textContent; // Get user email
            alert(`User ${email} has been approved ✅`);
            row.style.backgroundColor = "#00B074"; // Light green background
        });
    });

    // Reject (delete) user function
    deleteIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const row = this.closest("tr"); // Get the row
            const email = row.cells[1].textContent; // Get user email
            const confirmDelete = confirm(`Are you sure you want to reject ${email}?`);
            if (confirmDelete) {
                row.remove(); // Remove the row
                alert(`User ${email} has been rejected ❌`);
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const notificationBell = document.getElementById('notification-bell');
    const notificationDropdown = document.getElementById('notification-dropdown');

    notificationBell.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        notificationDropdown.style.display = 
            notificationDropdown.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!notificationBell.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.style.display = 'none';
        }
    });
});
// Simulated user data (replace with your actual login system)
    const user = {
        username: "ShopOwner123",
        restaurants: ["Restaurant A", "Restaurant B", "Restaurant C"]
    };

    // Function to set the restaurant (e.g., after selection or login)
    function setRestaurant(restaurant) {
        localStorage.setItem("selectedRestaurant", restaurant); // Store selection
        document.getElementById("restaurant-name").textContent = `[${restaurant}]`; // Display it
    }

    // On page load, check for selected restaurant
    window.onload = function() {
        const selectedRestaurant = localStorage.getItem("selectedRestaurant") || user.restaurants[0]; // Default to first restaurant
        setRestaurant(selectedRestaurant);

        // Example: Update username display (existing code)
        document.getElementById('username-display').textContent = user.username;
        document.getElementById('email').value = "user@example.com";
        document.getElementById('phone').value = "+63 123 456 7890";
    };

    // Example: Add a dropdown to switch restaurants (optional)
    document.addEventListener('DOMContentLoaded', function() {
        const topbarNav = document.querySelector('.topbar-nav');
        const select = document.createElement('select');
        select.id = 'restaurant-select';
        select.style.marginLeft = '10px';
        select.style.padding = '5px';
        user.restaurants.forEach(restaurant => {
            const option = document.createElement('option');
            option.value = restaurant;
            option.textContent = restaurant;
            select.appendChild(option);
        });
        topbarNav.appendChild(select);

        // Set initial value
        select.value = localStorage.getItem("selectedRestaurant") || user.restaurants[0];

        // Update on change
        select.addEventListener('change', function() {
            setRestaurant(this.value);
            // Optionally reload data specific to the selected restaurant
            console.log(`Switched to ${this.value}`);
        });
    });
    // Simulate logged-in restaurant (replace this with actual login logic later)
const loggedInRestaurant = "Jollibee"; // Test with "Greenwich" or "Mang Inasal" too

// Display the current restaurant in the topbar
document.getElementById('current-restaurant').textContent = `Managing: ${loggedInRestaurant}`;

// Optional: Filter the transaction table by restaurant
function filterTransactionsByRestaurant(restaurant) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const restaurantCell = row.querySelector('td:nth-child(4)').textContent; // "RESTAURANT" column
        if (restaurantCell === restaurant) {
            row.style.display = ''; // Show row
        } else {
            row.style.display = 'none'; // Hide row
        }
    });
}

// Apply the filter
filterTransactionsByRestaurant(loggedInRestaurant);