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

    const filterSelect = document.querySelector("#filter-category");

    // Filter dishes by category
    filterSelect.addEventListener("change", () => {
        const selectedCategory = filterSelect.value;
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const filteredProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);

        displayProducts(filteredProducts);
    });

    function displayProducts(products) {
        const productContainer = document.querySelector("#product-container");
        productContainer.innerHTML = ""; // Clear existing products

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.dishName}">
                <h3>${product.dishName}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price}</p>
            `;

            productContainer.appendChild(productElement);
        });
    }

    // Initial display of all products
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    displayProducts(allProducts);
});

document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector(".btn"); // Ensure your ADD button has class="btn"
    const priceInput = document.querySelector("input[placeholder='Enter price']");

    // Restrict input to numbers only
    priceInput.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^0-9.]/g, ""); // Allows only numbers and decimals
    });

    addButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form behavior

        const dishName = document.querySelector("input[placeholder='Enter Dish']").value.trim();
        const category = document.querySelector("select").value.trim();
        const price = priceInput.value.trim();
        const imageInput = document.querySelector("input[type='file']");
        const imageFile = imageInput.files[0];

        if (!dishName || !category || !price || !imageFile) {
            alert("Please fill in all fields before adding!");
            return;
        }

        // Read image as a Base64 string
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;

            // Retrieve existing products or create an empty array
            let products = JSON.parse(localStorage.getItem("products")) || [];

            // Add new product to the array
            products.push({ dishName, category, price, imageUrl });

            // Save updated array back to localStorage
            localStorage.setItem("products", JSON.stringify(products));

            alert("Product added successfully!");
            
            // Clear form fields
            document.querySelector("input[placeholder='Enter Dish']").value = "";
            priceInput.value = "";
            imageInput.value = "";
        };

        reader.readAsDataURL(imageFile); // Convert image to Base64
    });
});
document.getElementById('add-menu-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const dishName = document.getElementById('dish-name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').files[0];

    console.log('Menu Item:', { dishName, category, price, image });
    // Add your logic to send data to the server (e.g., FormData for file upload)
    window.location.href = 'dish.html'; // Redirect after submission
});
