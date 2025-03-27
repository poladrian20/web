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
});


 