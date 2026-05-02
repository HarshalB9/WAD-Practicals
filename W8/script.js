// hnh
// Step 1 - tooltip activation
const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
// use map, not forEach
// also forgot to use new keyword
// see the case of the word Tooltip
tooltipTriggerList.map(elem => new bootstrap.Tooltip(elem));

// Step 2 - Form submit then check validity
const registrationForm = document.querySelector('.needs-validation');

registrationForm.addEventListener('submit', (event) => {
    if(!registrationForm.checkValidity()){
        event.preventDefault();
        event.stopPropagation();
    }

    registrationForm.classList.add('was-validated');
});
