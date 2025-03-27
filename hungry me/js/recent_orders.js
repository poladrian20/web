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

    // Edit button functionality
    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Edit functionality not implemented yet.");
        });
    });

    // Delete row when clicking delete button
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => deleteRow(button));
    });

    // Delete row when clicking the trash (SVG delete icon)
    deleteIcons.forEach(icon => {
        icon.addEventListener("click", () => deleteRow(icon));
    });

    // Toggle row highlight when clicking the check (SVG check icon)
    checkIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            let row = icon.closest("tr");
            row.classList.toggle("checked-row");
        });
    });

    // Function to delete a row
    function deleteRow(element) {
        if (confirm("Are you sure you want to delete this user?")) {
            const row = element.closest("tr");
            if (row) row.remove();
        }
    }

    // Toggle submenu visibility only if submenu exists
    submenuToggles.forEach(toggle => {
        toggle.addEventListener("click", event => {
            const submenu = toggle.nextElementSibling;
            if (submenu && submenu.classList.contains("submenu")) {
                event.preventDefault();
                submenu.style.display = submenu.style.display === "block" ? "none" : "block";
            }
        });
    });

    // Toggle submenu item selection
    submenuItems.forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault();
            item.classList.toggle("active");
        });
    });

    // Redirect to users.html when clicking "All Users" label
    if (userLabel) {
        userLabel.addEventListener("click", () => {
            window.location.href = "menu.html";
        });
    }

    // Profile dropdown toggle
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

    // Function to get query parameter from URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get username from URL and display user details
    const username = getQueryParam("username");
    if (username && document.getElementById("username")) {
        document.getElementById("username").textContent = username;

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

    // Modal handling
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-btn');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const updateStatusBtn = document.querySelector('.update-status-btn');

    // Open modal and populate data for combined orders
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const orderData = JSON.parse(card.getAttribute('data-order'));

            // Populate customer info
            document.getElementById('modal-customer').textContent = orderData.customer;
            document.getElementById('modal-address').textContent = orderData.address;
            document.getElementById('modal-distance').textContent = orderData.items ? orderData.items[0].distance : orderData.distance;
            document.getElementById('modal-time').textContent = orderData.items ? orderData.items[0].time : orderData.time;
            document.getElementById('modal-status').textContent = orderData.status;
            const statusElement = document.getElementById('modal-status');
            statusElement.className = `status status-${orderData.status.toLowerCase().replace(' ', '-')}`;

            // Check if orderData has items (multi-item order) or is a single-item order
            const itemsContainer = document.getElementById('modal-items');
            if (itemsContainer) { // Multi-item order
                itemsContainer.innerHTML = '';
                let totalPrice = 0;

                orderData.items.forEach(item => {
                    totalPrice += item.price * item.quantity;
                    const itemElement = document.createElement('div');
                    itemElement.className = 'order-item';
                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="order-item-details">
                            <h4>${item.name}</h4>
                            <p>Price: ₱${item.price}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                    `;
                    itemsContainer.appendChild(itemElement);
                });

                document.getElementById('modal-total-price').textContent = totalPrice;
            } else { // Single-item order (backward compatibility)
                document.getElementById('modal-image').src = orderData.image;
                document.getElementById('modal-name').textContent = orderData.name;
                document.getElementById('modal-price').textContent = orderData.price;
                document.getElementById('modal-quantity').textContent = orderData.quantity;
            }

            modal.style.display = 'flex';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Update status
    updateStatusBtn.addEventListener('click', () => {
        const statusElement = document.getElementById('modal-status');
        let currentStatus = statusElement.textContent;
        let newStatus = currentStatus;

        if (currentStatus === 'Pending') {
            newStatus = 'In Progress';
        } else if (currentStatus === 'In Progress') {
            newStatus = 'Delivered';
        } else {
            newStatus = 'Pending';
        }

        statusElement.textContent = newStatus;
        statusElement.className = `status status-${newStatus.toLowerCase().replace(' ', '-')}`;

        // Update the card's data-order attribute
        const activeCard = document.querySelector('.card[data-order]');
        const orderData = JSON.parse(activeCard.getAttribute('data-order'));
        orderData.status = newStatus;
        activeCard.setAttribute('data-order', JSON.stringify(orderData));
    });
});

// Remove redundant event listeners outside DOMContentLoaded