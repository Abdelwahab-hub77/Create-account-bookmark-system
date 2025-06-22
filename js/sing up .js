
// Get DOM elements

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let confirmPasswordInput = document.getElementById("cofirmPasswordInput");
let submitButton = document.getElementById("submitButton");
let Loginbutton = document.getElementById("loginHere");

let nameError = document.getElementById("errorNameInput");
let emailError = document.getElementById("errorEmailInput");
let passwordError = document.getElementById("errorPasswordInput");
let confirmPasswordError = document.getElementById("errorConfirmPasswordInput");

let passwordContainer = []; // Array to store user data 

// Initialize data from local storage
getData();

//==============================================
// Add event listeners
submitButton.addEventListener('click', addUser);
nameInput.addEventListener('input', validationName);
emailInput.addEventListener('input', validationEmail);
passwordInput.addEventListener('input', validationPassword);
confirmPasswordInput.addEventListener('input', validationConfirmPassword);
Loginbutton.addEventListener('click', goToLoginForm);


//==============================================
// funcation to adds a new user to the system after validating the form.

function addUser(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const isNameValid = validationName(nameInput);
    const isEmailValid = validationEmail(emailInput);
    const isPasswordValid = validationPassword(passwordInput);
    const isConfirmPasswordValid = validationConfirmPassword(confirmPasswordInput);
    const isEmailUnique = isEmailUnique(emailInput);
    // If all validations pass, add the user
    /*
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isEmailUnique) 
    you can use this line if you want to check  fields before proceeding insteid of checking them in the isFormValid() funccation
    */

    if (isFormValid()) {
        let userData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
        };

        passwordContainer.push(userData);
        localStorage.setItem('data', JSON.stringify(passwordContainer));
        window.location.href = "Bookmarker.html";
        clearForm();
    }

}


//==============================================
// funcation to Checks if the entire form is valid based on 'is-valid' classes and email uniqueness.

function isFormValid() {
    const isNameValid = nameInput.classList.contains('is-valid');
    const isEmailValid = emailInput.classList.contains('is-valid');
    const isPasswordValid = passwordInput.classList.contains('is-valid');
    const isConfirmPasswordValid = confirmPasswordInput.classList.contains('is-valid');
    const isEmailUnique = searchEmailUniqueness();

    return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isEmailUnique;
}

// ---====================== Validation Functions ===============================---


//Validates the name input field.

function validationName() {
    const nameRegex = /^[a-zA-Z0-9_ -]{4,}$/;
    const name = nameInput.value.trim();

    nameInput.classList.remove('is-valid', 'is-invalid');// Remove any existing validation classes
    nameError.classList.remove('show_error', 'hide_error'); // Remove error message if it exists

    if (name === '') {
        nameInput.classList.add('is-invalid');
        nameError.classList.add('show_error');
        nameError.textContent = "Name cannot be empty."; 
        return false;
    } else if (nameRegex.test(name)) {
        nameInput.classList.add('is-valid');
        nameError.classList.add('hide_error');
        return true;
    } else {
        nameInput.classList.add('is-invalid');
        nameError.classList.add('show_error');
        nameError.textContent = "Name must be at least 4 characters long and can contain letters, numbers, underscores, spaces, and hyphens."; // Specific error message
        return false;
    }
}

//==============================================
 // Validates the email input field 
function validationEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(01)[0-2,5]{1}[0-9]{8}$/;
    const email = emailInput.value.trim();

    emailInput.classList.remove('is-valid', 'is-invalid');
    emailError.classList.remove('show_error', 'hide_error');

    if (email === '') {
        emailInput.classList.add('is-invalid');
        emailError.classList.add('show_error');
        emailError.textContent = "Email or phone number cannot be empty.";
        return false;
    }

    if (emailRegex.test(email) || phoneRegex.test(email)) {
        emailInput.classList.add('is-valid');
        emailError.classList.add('hide_error');
        return true;
    } else {
        emailInput.classList.add('is-invalid');
        emailError.classList.add('show_error');
        emailError.textContent = "Please enter a valid email address or an Egyptian phone number (e.g., 01xxxxxxxxx).";
        return false;
    }
}

//==============================================
  // Validates the password input field.
 
function validationPassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?`~]).{8,}$/;
    const password = passwordInput.value.trim(); // Use passwordInput directly

    passwordInput.classList.remove('is-valid', 'is-invalid');
    passwordError.classList.remove('show_error', 'hide_error');

    if (password === '') {
        passwordInput.classList.add('is-invalid');
        passwordError.classList.add('show_error');
        passwordError.textContent = "Password cannot be empty.";
        return false;
    } else if (passwordRegex.test(password)) {
        passwordInput.classList.add('is-valid');
        passwordError.classList.add('hide_error');
        return true;
    } else {
        passwordInput.classList.add('is-invalid');
        passwordError.classList.add('show_error');
        passwordError.textContent = "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.";
        return false;
    }
}

//==============================================
 // Validates the confirm password input field 

function validationConfirmPassword() {
    let password = passwordInput.value.trim();
    let confirmPassword = confirmPasswordInput.value.trim();

    confirmPasswordInput.classList.remove('is-valid', 'is-invalid');
    confirmPasswordError.classList.remove('show_error', 'hide_error');

    if (confirmPassword === '') {
        confirmPasswordInput.classList.add('is-invalid');
        confirmPasswordError.classList.add('show_error');
        confirmPasswordError.textContent = "Confirm Password cannot be empty.";
        return false;
    } else if (password === confirmPassword) {
        confirmPasswordInput.classList.add('is-valid');
        confirmPasswordError.classList.add('hide_error');
        return true;
    } else {
        confirmPasswordInput.classList.add('is-invalid');
        confirmPasswordError.classList.add('show_error');
        confirmPasswordError.textContent = "Passwords do not match.";
        return false;
    }
}

//==============================================
 // Retrieves user data from local storage.
 
function getData() {
    const storedData = localStorage.getItem('data');
    if (storedData !== null) {
        passwordContainer = JSON.parse(storedData);
    }
}

//==============================================
//Redirects to the login form.

function goToLoginForm(event) {
    event.preventDefault(); // Prevent default link behavior
    window.location.href = "index.html";
}

//==============================================
// Clears all form fields and their validation states.
 
function clearForm() {
    nameInput.value = '';
    nameInput.classList.remove('is-valid', 'is-invalid');
    nameError.classList.remove('show_error', 'hide_error'); // Hide error message

    emailInput.value = '';
    emailInput.classList.remove('is-valid', 'is-invalid');
    emailError.classList.remove('show_error', 'hide_error'); // Hide error message

    passwordInput.value = '';
    passwordInput.classList.remove('is-valid', 'is-invalid');
    passwordError.classList.remove('show_error', 'hide_error'); // Hide error message

    confirmPasswordInput.value = '';
    confirmPasswordInput.classList.remove('is-valid', 'is-invalid');
    confirmPasswordError.classList.remove('show_error', 'hide_error'); // Hide error message
}


//==============================================
 //Checks if the entered email is unique (not already registered).

function searchEmailUniqueness() {
    const email = emailInput.value.trim();
    /*  
    check if the email format itself is valid 
     If email format is invalid, no need to check uniqueness yet.
     */

    if (!emailInput.classList.contains('is-valid')) {
        
        
        return false;
    }

    const foundUser = passwordContainer.find(data => data.email === email);

    emailInput.classList.remove('is-valid', 'is-invalid'); // Reset before setting new state
    emailError.classList.remove('show_error', 'hide_error');

    if (foundUser) {
        emailInput.classList.add('is-invalid');
        emailError.classList.add('show_error');
        emailError.textContent = "This email is already registered. Please use a different one.";
        return false;
    } else {
        emailInput.classList.add('is-valid'); // It's valid AND unique
        emailError.classList.add('hide_error');
        return true;
    }
}