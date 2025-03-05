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
    const submenuToggles = document.querySelectorAll(".sidebar .toggle");
    const submenuItems = document.querySelectorAll(".submenu-item");
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
            row.classList.toggle("checked-row"); // Toggles highlight
        });
    });

    // ✅ Function to delete a row
    function deleteRow(element) {
        if (confirm("Are you sure you want to delete this user?")) {
            const row = element.closest("tr");
            if (row) row.remove();
        }
    }

    // ✅ Toggle submenu visibility when clicking a toggle button
    submenuToggles.forEach(toggle => {
        toggle.addEventListener("click", event => {
            event.preventDefault();
            const submenu = toggle.nextElementSibling;
            submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        });
    });

    // ✅ Toggle submenu item selection (turn blue when clicked, reset when clicked again)
    submenuItems.forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault();
            item.classList.toggle("active"); // Toggles blue background
        });
    });

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

document.addEventListener("DOMContentLoaded", () => {
    console.log("dish.js loaded!"); // Debugging step

    const tableBody = document.querySelector("tbody"); // Target the table body
    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        console.log("No products found.");
    } else {
        tableBody.innerHTML = ""; // Clear existing content

        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.dishName}</td>
                <td>${product.category}</td>
                <td>₱${product.price}</td>
                <td><img src="${product.imageUrl}" alt="${product.dishName}" height="60"></td>
                <td class="actions">
                    <svg class="check-icon" data-index="${index}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B074" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    
                    <svg class="delete-icon" data-index="${index}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E66767" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"></path>
                    </svg>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // ✅ Add event listeners for deleting products with confirmation
        document.querySelectorAll(".delete-icon").forEach(icon => {
            icon.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                if (confirm("Are you sure you want to delete this product?")) {
                    deleteProduct(index);
                }
            });
        });

        // ✅ Add event listeners for checking items with confirmation
        document.querySelectorAll(".check-icon").forEach(icon => {
            icon.addEventListener("click", (event) => {
                if (confirm("Do you want to mark this item as checked?")) {
                    let row = event.target.closest("tr");
                    row.classList.toggle("checked-row");
                }
            });
        });
    }
});

// ✅ Function to delete a product
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1); // Remove the selected product
    localStorage.setItem("products", JSON.stringify(products));
    location.reload(); // Refresh page to update the table
}





