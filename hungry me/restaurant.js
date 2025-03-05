document.addEventListener("DOMContentLoaded", () => {
    const selectButtons = document.querySelectorAll(".select-btn");

    selectButtons.forEach(button => {
        button.addEventListener("click", () => {
            const restaurantName = button.parentElement.querySelector("h3").textContent;
            alert(`You selected ${restaurantName}`);

            // Redirect example (update with the actual URLs)
            if (restaurantName === "Jollibee") {
                window.location.href = "dashboard.html";
            } else if (restaurantName === "Greenwich") {
                window.location.href = "dashboard.html";
            } else if (restaurantName === "Mang Inasal") {
                window.location.href = "dashboard.html";
            }
        });
    });
});
