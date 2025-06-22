// Get a reference to the modal element
const errorModalElement = document.getElementById('errorModal');
// Initialize a Bootstrap modal instance
const errorModal = new bootstrap.Modal(errorModalElement);
const modalBodyInput = document.getElementById('modalBody'); 

// Get DOM elements

const emailInput = document.getElementById('emailInput');
const getPasswordBtn = document.getElementById('getPassword'); 
const emailError = document.getElementById('emailError');
const loginLink = document.getElementById('loginHere'); 
const signUpLink = document.getElementById('signUp'); 

let usersContainer = []; // arrey to store users data

getData(); // Initialize data from local storage


// Add event listeners
emailInput.addEventListener('input', validationEmail);
getPasswordBtn.addEventListener('click', getPassword);
loginLink.addEventListener('click', goToLoginForm);
signUpLink.addEventListener('click', goToSignUpForm);

//=============================================
 // Validates the email and then attempts to retrieve or indicate password recovery.

function getPassword(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate the email input format first
    const isEmailFormatValid = validationEmail();

    if (isEmailFormatValid) {
        let email = emailInput.value.trim();
        let foundUser = usersContainer.find(user => user.email === email);

        if (foundUser) {
        
            modalBodyInput.innerHTML = `
                <p class="fs-6 fw-semibold text-success">
                    <span class="fw-bold text-primary">Your Password is:</span> ${foundUser.password}
                </p>
            `;
            errorModal.show();
            clearForm(); // Clear the email input after showing the password
        } else {
            // Email not found in the registered users
            modalBodyInput.innerHTML = `
                <p class="fs-6 fw-semibold text-danger">
                    Email not found.<br> Please check the email address or sign up.
                </p> `;
            errorModal.show();

            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            emailError.classList.add('show_error');
            emailError.classList.remove('hide_error');
            emailError.textContent = "This email is not registered.";
        }
    } else {
        // If email format is invalid, ensure the error message is visible on the input field
        emailError.classList.add('show_error');
        emailError.classList.remove('hide_error');
        // The validationEmail function should already set the specific error message
    }
}

//=============================================
//Retrieves user data from local storage.

function getData() {
    const storedData = localStorage.getItem('data');
    if (storedData !== null) {
        usersContainer = JSON.parse(storedData);
    }
}

//=============================================
 //Validates the email input field (can also accept phone numbers).

function validationEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(01)[0-2,5]{1}[0-9]{8}$/; 

    const email = emailInput.value.trim();

    // Reset previous validation states and error messages
    emailInput.classList.remove('is-valid', 'is-invalid');
    emailError.classList.remove('show_error', 'hide_error');
    emailError.textContent = ''; // Clear previous specific error message

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

//=============================================
// Clears the email form field and its validation states.

function clearForm() {
    emailInput.value = '';
    emailInput.classList.remove('is-valid', 'is-invalid');
    emailError.classList.remove('show_error', 'hide_error'); 
    emailError.textContent = ''; 
}

//=============================================
//Redirects to the signup form.

function goToSignUpForm(event) {
    event.preventDefault();
    window.location.href = "Singup form.html"; 
}

//=============================================
 //Redirects to the login form.

function goToLoginForm(event) {
    event.preventDefault();
    window.location.href = "index.html"; 
}