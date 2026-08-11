import { FaGithub } from "react-icons/fa"
import { useState } from "react"

import "../styles/components/navBar.css"


const NavBar = (): React.JSX.Element => {

    const [mobileMenuOpen, setMobileMenu] = useState(false);

    const toggleMobileMenu = (mobileMenuOpen: Boolean): void => {
        if (mobileMenuOpen) {
            setMobileMenu(false);
        }
        else {
            setMobileMenu(true);
        }
    }

    return <>
        <nav id="navbar" aria-label="Primary">
            <div id="left-nav-side" className="nav-sides">
                <div id="navbar-logo-container">
                    <a href="https://crestr.co.uk">
                        <img src="https://images.crestr.co.uk/Crest-Logo.png" id="navbar-logo-image" alt="Crest logo" width="60" height="60" />
                    </a>
                </div>
                <ul id="about-navbar-list" className="navbar-list">
                    <li className="navbar-item"><a href="#about-section" className="navbar-link">About</a></li>
                    <li className="navbar-item"><a href="#feature-section" className="navbar-link">Features</a></li>
                    <li className="navbar-item"><a href="https://crestr.co.uk/docs" className="navbar-link">Documentation</a></li>
                </ul>
            </div>


            <div id="right-nav-side" className="nav-sides">

                <ul id="login-register-navbar-list" className="navbar-list">
                    <li id="login-link" className="navbar-item"><a href="https://app.crestr.co.uk/login-page" className="navbar-link">Login</a></li>
                    <li id="register-link" className="navbar-item"><a href="https://app.crestr.co.uk/register" className="navbar-link">Register</a></li>
                </ul>

                <ul className="navbar-list">
                    <li className="navbar-item">
                        <a href="https://github.com/abdlfc11/Crestr-Hiking-App" target="_blank" rel="noopener noreferrer" className="navbar-link github-icon-link" aria-label="View GitHub repository">
                            <FaGithub />
                        </a>
                    </li>
                </ul>

                {/** mobile hamburger menu toggle: only visible below 768px, controls #mobile-menu */}
                <button type="button" className={mobileMenuOpen ? "open" : ""} onClick={() => toggleMobileMenu(mobileMenuOpen)} id="mobile-menu-toggle" aria-label="Open menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-menu">
                    <svg className="icon-hamburger" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <svg className="icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

            </div>
        </nav>

        <div id="mobile-menu" className={mobileMenuOpen ? "open" : ""}>
            <ul id="mobile-menu-list">
                <li><a className="mobile-menu-link" href="#about-section">About</a></li>
                <li><a className="mobile-menu-link" href="#feature-section">Features</a></li>
                <li><a className="mobile-menu-link" href="https://crestr.co.uk/docs">Documentation</a></li>
                <li className="mobile-menu-divider" role="separator" />
                <li><a className="mobile-menu-link mobile-menu-link-primary" href="https://app.crestr.co.uk/register">Register</a></li>
            </ul>
        </div>
    </>
}

export default NavBar