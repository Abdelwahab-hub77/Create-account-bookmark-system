// Get DOM elements
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

let Loginbutton = document.getElementById("Loginbutton");
let createAccount = document.getElementById("signUp"); 
let forgotPassword = document.getElementById("forgotPassword");

let emailError = document.getElementById("errorEmail");
let passwordError = document.getElementById("errorPassward"); 

//=========================================================
//  array to store user data
let usersContainer = []; 

// Initialize data from local storage
getData();

//=========================================================
// Add event listeners
Loginbutton.addEventListener('click',login); 
emailInput.addEventListener('input', validationEmail);
passwordInput.addEventListener('input', validationPassword);
createAccount.addEventListener('click', goToSignUpForm); 
forgotPassword.addEventListener('click', goToForgotPasswordForm);

// Handles the login 

function login(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // If initial format validations pass, proceed to check credentials
   const isEmailValid = validationEmail();
   const isPasswordValid = validationPassword();

    if ( isEmailValid && isPasswordValid) {
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        const userFoundByEmail = usersContainer.find(user => user.email === email);

        if (userFoundByEmail) {
            // Email exists, now check password
            if (userFoundByEmail.password === password) {
                // Successful login
                window.location.href = "Bookmarker.html"; // Redirect to Bookmarker page
                clearForm();
            } else {
                // Incorrect password for the given email
                passwordInput.classList.add('is-invalid');
                passwordInput.classList.remove('is-valid'); 
                passwordError.classList.add('show_error');
                passwordError.classList.remove('hide_error');
                passwordError.textContent = "Incorrect password."; // Specific error message
                passwordInput.value = ''; // Clear password field for security
            }
        } 
        
        else {
            // Email not found
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid'); // Ensure valid class is removed
            emailError.classList.add('show_error');
            emailError.classList.remove('hide_error');
            emailError.textContent = "Email not found."; // Specific error message
            passwordInput.value = ''; // Clear password field for security
            passwordInput.classList.remove('is-invalid', 'is-valid'); // Reset password field's visual state
            passwordError.classList.remove('show_error', 'hide_error'); // Hide password error if any
        }
    } 
}

// ============================== Validation Functions =========================

// ==================  validationEmail() ==================

 // Validates the email input field 

function validationEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(01)[0-2,5]{1}[0-9]{8}$/; 
    const email = emailInput.value.trim();

    // Reset previous validation states and error messages
    emailInput.classList.remove('is-valid', 'is-invalid');
    emailError.classList.remove('show_error', 'hide_error');
    emailError.textContent = ''; // Clear previous error message

    if (email === '') {
        emailInput.classList.add('is-invalid');
        emailError.classList.add('show_error');
        emailError.textContent = "Email or phone number cannot be empty.";
        return false;
    }

    if (emailRegex.test(email) || phoneRegex.test(email)) {
        emailInput.classList.add('is-valid');
        emailError.classList.add('hide_error'); // Hide error if valid
        return true;
    } else {
        emailInput.classList.add('is-invalid');
        emailError.classList.add('show_error');
        emailError.textContent = "Please enter a valid email address or an Egyptian phone number (e.g., 01xxxxxxxxx).";
        return false;
    }
}

// ==================  validationPassword() ==================
 // Validates the password input field.

function validationPassword() {
    // Regex for password validation (at least 8 chars, incl. lower, upper, digit, special)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?`~]).{8,}$/;
    const password = passwordInput.value.trim();

    // Reset previous validation states and error messages
    passwordInput.classList.remove('is-valid', 'is-invalid');
    passwordError.classList.remove('show_error', 'hide_error');
    passwordError.textContent = ''; // Clear previous error message

    if (password === '') {
        passwordInput.classList.add('is-invalid');
        passwordError.classList.add('show_error');
        passwordError.textContent = "Password cannot be empty.";
        return false;
    }

    if (passwordRegex.test(password)) {
        passwordInput.classList.add('is-valid');
        passwordError.classList.add('hide_error'); // Hide error if valid
        return true;
    } else {
        passwordInput.classList.add('is-invalid');
        passwordError.classList.add('show_error');
        passwordError.textContent = "Password must be at least 8 characters, include a capital letter, a lowercase letter, a number, and a special character.";
        return false;
    }
}

// ============================  getData() ==================
  // Retrieves user data from local storage a
function getData() {
    const storedData = localStorage.getItem('data');
    if (storedData !== null) {
        usersContainer = JSON.parse(storedData);
    }
}

// ============================  clearForm() ==================
// Clears all form fields and their validation states.

function clearForm() {
    emailInput.value = '';
    emailInput.classList.remove('is-valid', 'is-invalid');
    emailError.classList.remove('show_error', 'hide_error'); // Hide error message
    emailError.textContent = '';

    passwordInput.value = '';
    passwordInput.classList.remove('is-valid', 'is-invalid');
    passwordError.classList.remove('show_error', 'hide_error'); // Hide error message
    passwordError.textContent = '';
}

// ============================  goToSignUpForm() ==================
// Redirects to the signup form.

function goToSignUpForm(event) {
    event.preventDefault();
    window.location.href = "Singup form.html";
}

// ============================  goToForgotPasswordForm() ==================
// Redirects to the forgot password form.

function goToForgotPasswordForm(event) {
    event.preventDefault();
    window.location.href = "Forgot Password.html";
}