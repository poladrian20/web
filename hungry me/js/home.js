// Handle navigation to transactions
function viewTransactions(destination) {
    localStorage.setItem('currentDestination', destination); // Store the selected destination
    if (destination === 'Matutina-Gerrys Seafood House') {
        window.location.href = 'matutina_transac.html';
    } else if (destination === 'Kainan ni Mang Peping') {
        window.location.href = 'mangpeping_transac.html';
    } else if (destination === 'Ciudad Elmina Restaurant') {
        window.location.href = 'ciudad_transac.html';
    } else {
        window.location.href = 'matutina_transac.html'; // Default fallback
    }
}

// Notification bell functionality (unchanged)
const notificationBell = document.getElementById('notification-bell');
const notificationDropdown = document.getElementById('notification-dropdown');
const notificationCount = document.querySelector('.notification-count');
const profileIcon = document.getElementById('profile-icon');
const profileDropdown = document.getElementById('profile-dropdown');

// Toggle notification dropdown
notificationBell.addEventListener('click', function(e) {
    e.preventDefault();
    notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
});

// Update notification count
const notificationItems = document.querySelectorAll('.notification-item');
notificationCount.textContent = notificationItems.length;
notificationCount.style.display = notificationItems.length > 0 ? 'inline-block' : 'none';

// Toggle profile dropdown
profileIcon.addEventListener('click', function() {
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!notificationBell.contains(e.target) && !notificationDropdown.contains(e.target)) {
        notificationDropdown.style.display = 'none';
    }
    if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.style.display = 'none';
    }
});

// User Account Handling (unchanged)
const user = JSON.parse(localStorage.getItem('user'));
document.getElementById('username-display').textContent = user.username;
document.getElementById('email').value = user.email;
document.getElementById('phone').value = user.phone;

document.getElementById('edit-profile-btn').addEventListener('click', function() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const isEditable = emailInput.disabled;
    emailInput.disabled = !isEditable;
    phoneInput.disabled = !isEditable;
    this.textContent = isEditable ? 'Save Changes' : 'Edit Profile';
});

