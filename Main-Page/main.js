// ###########
// IMPORTS
// ###########

// ###########
// CONSTANTS / VARIABLES
// ###########

const createAccountHeroButton = document.getElementById('hero-create-account-button')
const mobileMenuToggle = document.getElementById('mobile-menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')
const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu-link') : []

// ###########
// ACCORDION (ABOUT SECTION)
// ###########

document.querySelectorAll('.about-group-header-button').forEach(headerButton => {
    headerButton.addEventListener('click', () => {
        const group = headerButton.closest('.about-group');
        const isOpen = group.classList.toggle('open');
        // keep aria-expanded in sync so screen readers know the panel state
        headerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
});

// ###########
// MOBILE MENU (HAMBURGER DROPDOWN)
// ###########

function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileMenuToggle.classList.add('open');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    mobileMenuToggle.setAttribute('aria-label', 'Close menu');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuToggle.classList.remove('open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Open menu');
}

function toggleMobileMenu() {
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // this closes the menu whenever a link inside it is tapped, so it doesn't stay open after navigating to a new section/page
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // this closes on Escape for keyboard users
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // close if the viewport is resised/rotated up to desktop width, so the
    // menu can't get stuck open behind the now-visible desktop nav
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // close when clicking anywhere outside the menu or the toggle button
    document.addEventListener('click', (event) => {
        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedToggle = mobileMenuToggle.contains(event.target);
        if (!clickedInsideMenu && !clickedToggle && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });
}

// ###########
// NAVIGATION HELPERS
// ###########

function switchToMap() {
    window.location.href = "https://app.crestr.co.uk/map"
}