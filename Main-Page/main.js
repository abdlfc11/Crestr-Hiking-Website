// ###########
// IMPORTS 
// ###########

// ###########
// CONSTANTS / VARIABLES
// ###########

const createAccountHeroButton = document.getElementById('hero-create-account-button')

// ###########
// ADDING EVENT LISTENERS
// ###########


document.querySelectorAll('.about-group-header-button').forEach(headerButton => {
    headerButton.addEventListener('click', () => {
        const group = headerButton.closest('.about-group');
        group.classList.toggle('open')
    })
});

function switchToRegistering() {
    window.location.href = "https://app.crestr.co.uk/register"
}