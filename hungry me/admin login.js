const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');

// ✅ Correct credentials (update as needed)
const correctEmail = "admin@email.com";
const correctPassword = "password123";

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateInputs()) { // Proceed only if validation passes
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (emailValue === correctEmail && passwordValue === correctPassword) {
            window.location.href = "restaurant.html"; // ✅ Redirects on success
        } else {
            alert("Invalid login credentials. Please check your email and password.");
        }
    }
});

// 👁️ Toggle password visibility
togglePassword.addEventListener('click', () => {
    if (password.type === 'text') {
        password.type = 'password';
        togglePassword.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        password.type = 'text';
        togglePassword.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
});

// ✅ Validate input fields
const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let isValid = true;

    if (emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        setSuccess(password);
    }

    return isValid;
};

// ✅ Helper Functions
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};
