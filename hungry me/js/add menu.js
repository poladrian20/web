document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector(".btn");
    const dishNameInput = document.querySelector("#dish-name");
    const categorySelect = document.querySelector("#category");
    const priceInput = document.querySelector("#price");
    const imageInput = document.querySelector("#image");
    const fileUploadText = document.querySelector(".file-upload-text");
    const form = document.querySelector("#add-menu-form");

    // Restrict price input to numbers and decimals only
    priceInput.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^0-9.]/g, "");
    });

    // Image preview when file is selected
    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                fileUploadText.textContent = file.name;

                // Create or update image preview
                let preview = document.getElementById("image-preview");
                if (!preview) {
                    preview = document.createElement("img");
                    preview.id = "image-preview";
                    preview.style.maxWidth = "100%";
                    preview.style.marginTop = "10px";
                    preview.style.borderRadius = "8px";
                    imageInput.parentElement.appendChild(preview);
                }
                preview.src = e.target.result; // Display the image
            };
            reader.readAsDataURL(file);
        } else {
            fileUploadText.textContent = "Choose an image";
        }
    });

    // Handle form submission
    addButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form behavior

        const dishName = dishNameInput.value.trim();
        const category = categorySelect.value.trim();
        const price = priceInput.value.trim();
        const imageFile = imageInput.files[0];

        // Validate inputs
        if (!dishName || !category || !price || !imageFile) {
            alert("Please fill in all fields before adding!");
            return;
        }

        // Convert image to Base64 and save product
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;

            // Retrieve or initialize products array
            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push({ dishName, category, price, imageUrl });
            localStorage.setItem("products", JSON.stringify(products));

            alert("Product added successfully!");

            // Clear form fields and preview
            form.reset(); // Resets all form inputs
            fileUploadText.textContent = "Choose an image"; // Reset file upload text
            const preview = document.getElementById("image-preview");
            if (preview) preview.remove(); // Remove image preview
        };
        reader.readAsDataURL(imageFile);
    });

    // Optional: Display products (if you want to show them on the same page)
    function displayProducts(products) {
        const productContainer = document.querySelector("#product-container");
        if (!productContainer) return; // Skip if no container exists

        productContainer.innerHTML = ""; // Clear existing products
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.dishName}">
                <h3>${product.dishName}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: ₱${product.price}</p>
            `;
            productContainer.appendChild(productElement);
        });
    }

    // Initial display of products (if applicable)
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    displayProducts(allProducts);
});