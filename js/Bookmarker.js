// Get a reference to the modal element
const errorModalElement = document.getElementById('errorModal');
// Initialize a Bootstrap modal instance (if using Bootstrap JS)
const errorModal = new bootstrap.Modal(errorModalElement);
const errorModalBodyContent = document.getElementById('errorModalBody'); 

// Get DOM elements
const siteNameInput = document.getElementById('SiteName');
const siteURLInput = document.getElementById('SiteURL');
const siteCategoryInput = document.getElementById('SiteCatogry'); 
const submitButton = document.getElementById('submitBtn');
const displayTable = document.getElementById('tbody');
const logoutButton = document.getElementById('logoutBtn'); 

let siteContainer = []; // Array to store site data

// --- Event Listeners ---
submitButton.addEventListener('click', addSite);
siteNameInput.addEventListener('input', validateNameOrCategory); // funcation to validate name or category
siteCategoryInput.addEventListener('input', validateNameOrCategory); // Using the same validation for category
siteURLInput.addEventListener('input', validateUrl); 
logoutButton.addEventListener('click', goToLoginForm);

// --- Initialization ---
// Get data from local storage and display 

    getData();


// ================== function addSite() ==================

//  Adds a new site to the container and local storage after validation.
 
function addSite() 
{
    const isNameValid = validateNameOrCategory.call(siteNameInput);
    const isCategoryValid = validateNameOrCategory.call(siteCategoryInput);
    const isUrlValid = validateUrl.call(siteURLInput);
    
    /*
    if (isNameValid && isCategoryValid && isUrlValid) 
    you can use this line if you want to check  fields before proceeding insteid of checking them in the isFormValid() funccation
    */

    if (isFormValid()) {
        // All inputs are valid, proceed to add the site
        let siteData = {
            siteName: siteNameInput.value.trim(),
            siteURL: siteURLInput.value.trim(),
            siteCategory: siteCategoryInput.value.trim() 
        };

        siteContainer.push(siteData);
        localStorage.setItem('data', JSON.stringify(siteContainer));
        clearForm();
        displaySiteData();
    } else {
        // If any input is invalid, display a detailed error message in the modal
        let errorMessages = '';

        // Check each input and append its specific error message if invalid
        if (!isNameValid) {
            errorMessages += `<p class="fs-6"><span class="fw-bold text-danger">Site Name:</span> must contain at least 4 characters from [a-zA-Z0-9_ -]</p>`;
        }
        if (!isCategoryValid) {
            errorMessages += `<p class="fs-6"><span class="fw-bold text-danger">Site Category:</span> must contain at least 4 characters from [a-zA-Z0-9_ -]</p>`;
        }
        if (!isUrlValid) {
            errorMessages += `<p class="fs-6"><span class="fw-bold text-danger">Site URL:</span> must be a valid URL (e.g., https://getbootstrap.com/)</p>`;
        }

        errorModalBodyContent.innerHTML = errorMessages;
        errorModal.show();
    }
}


// ================== function to check form validation ==================

// Checks if all form fields are valid before proceeding to add a site.

function isFormValid() {
    const isNameValid = siteNameInput.classList.contains('is-valid');
    const isCategoryValid = siteCategoryInput.classList.contains('is-valid'); 
    const isUrlValid = siteURLInput.classList.contains('is-valid');
    return isNameValid && isCategoryValid && isUrlValid;
}

// ================== function clearForm() ===================

// Clears all form fields and resets their validation states.

function clearForm() {
    siteNameInput.value = '';
    siteNameInput.classList.remove('is-valid', 'is-invalid');

    siteURLInput.value = '';
    siteURLInput.classList.remove('is-valid', 'is-invalid');

    siteCategoryInput.value = ''; 
    siteCategoryInput.classList.remove('is-valid', 'is-invalid');
}

// ================== function displaySiteData() ==================

// Displays site data in the table.

function displaySiteData() {
    let box = '';

    if (siteContainerLength() === 0) { // Check siteContainer include invalid data bookmark
        box = `
            <tr>
                <td colspan="5" class="text-center ">
                    <div class="empty-state">
                        <i class="fa-solid fa-book-open fa-3x mb-3 text-muted"></i>
                        <h3 class="h5">No Bookmarks Yet</h3>
                        <p class="text-muted">Add your first bookmark using the form above</p>
                    </div>
                </td>
            </tr>
        `;
    } else {
        let counter = 1;
        for (let i = 0; i < siteContainer.length; i++) {
            const site = siteContainer[i];
            // Ensure site object and its properties exist before trying to access them
            if (site && site.siteName && site.siteCategory && site.siteURL) { // Check for siteURL too
                box += `
                    <tr>
                        <td class="py-3">${counter}</td>
                        <td class="py-3">${site.siteName}</td>
                        <td class="py-3">${site.siteCategory}</td>
                        <td class="py-3">
                            <button class="btn btn-primary" onclick="visitSite('${site.siteURL}')">
                                <i class="fa-solid fa-bookmark pe-2"></i>Visit
                            </button>
                        </td>
                        <td class="py-3">
                            <button class="btn btn-danger" onclick="deleteSite(${i})">
                                <i class="fa-solid fa-trash pe-2"></i>Delete
                            </button>
                        </td>
                    </tr>`;
                counter++;
            }
        }
    }
    displayTable.innerHTML = box;
}

// ================== function visitSite() ==================
//Opens the provided URL in a new tab.

function visitSite(link) {
    window.open(link, '_blank');
}

// ================== function deleteSite() ==================
/*Removes the site at the specified index from the siteContainer array
  and local storage, then updates the display.*/

function deleteSite(siteIndex) {
    siteContainer.splice(siteIndex, 1);
    localStorage.setItem('data', JSON.stringify(siteContainer));
    displaySiteData();
}

// ================== function getData() ==================
// Retrieves site data from local storage and updates the siteContainer.

function getData() {
    const storedData = localStorage.getItem('data');
    if (storedData !== null) {
        siteContainer = JSON.parse(storedData);
    }
    displaySiteData();
}

// ================== function validateUrl() ==================

// Validates the URL input field.

function validateUrl() {
    // A more robust URL regex that includes http/https protocol
    const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/i;

    const url = this.value.trim();
    this.classList.remove('is-valid', 'is-invalid');

    if (url === '') {
        return false; 
    }

    if (urlRegex.test(url)) {
        this.classList.add('is-valid');
        return true;
    } else {
        this.classList.add('is-invalid');
        return false;
    }
}

// ================== function validateNameOrCategory() ==================

// Validates input fields  name and category for minimum length and allowed characters.

function validateNameOrCategory() {
    const regex = /^[a-zA-Z0-9_ -]{4,}$/; // At least 4 characters, allowed chars
    const value = this.value.trim();

    this.classList.remove('is-valid', 'is-invalid');

    if (value === '') {
        return false; 
    }

    if (regex.test(value)) {
        this.classList.add('is-valid');
        return true;
    } else {
        this.classList.add('is-invalid');
        return false;
    }
}

// ======================== siteContainerLength() ========================
// Validates the length of the siteContainer input field.
function siteContainerLength() {
    let len = 0;
    for (let i = 0; i < siteContainer.length; i++)
         { // count the number of elements in the siteContainer array
        if (siteContainer[i] && siteContainer[i].siteName && siteContainer[i].siteCategory)
            // if the element is Not empty and contains valid data about bookmark
            {
            len++;
        }
    }
    return len;
}

// ============================ goToLoginForm() =============================
// Redirects the user to the login form.

function goToLoginForm(event) {
    event.preventDefault();
    window.location.href = "index.html"; // Ensure this matches your login HTML file name
}