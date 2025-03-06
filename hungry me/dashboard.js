// Chart - Polar Area
var ctx = document.getElementById('myChart').getContext('2d');
var earning = document.getElementById('earning').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['Jollibee', 'Mang Inasal', 'Greenwich'],
        datasets: [{
            label: 'Traffic Source',
            data: [1100, 1500, 2205],
            backgroundColor: [
                'rgb(255, 0, 55)',
                'rgb(28, 187, 41)',
                'rgba(255, 206, 86, 1)'
            ],
        }]
    },
    options: {
        responsive: true,
    }
});

// Chart - Bar
var myChart = new Chart(earning, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Earning',
            data: [4500, 4106, 7005, 6754, 5154, 4554, 7815, 3152, 12204, 4457, 8740, 11000],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }]
    },
    options: {
        responsive: true,
    }
});

// Profile Dropdown Toggle
document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");

    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevents immediate closing when clicking
            profileDropdown.classList.toggle("show");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (event) => {
            if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.classList.remove("show");
            }
        });
    }
});
// Select the menu toggle button
let menuToggle = document.querySelector("#menu-toggle");
let menuItem = document.querySelector(".menu-item");

menuToggle.onclick = function(event) {
    event.preventDefault(); // Prevent default link behavior
    menuItem.classList.toggle("active"); // Toggle the submenu
};

// Close submenu when clicking outside
document.addEventListener("click", function(event) {
    if (!menuItem.contains(event.target) && event.target !== menuToggle) {
        menuItem.classList.remove("active");
    }
});
