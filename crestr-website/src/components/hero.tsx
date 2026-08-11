import React from "react"
import "../styles/components/hero.css"
import "../styles/components/buttons.css"

const Hero = (): React.JSX.Element  => {

    const switchToMap = (): void => {
        window.location.href = "https://app.crestr.co.uk/map";
    }

    return <section id="hero-section">
        <div id="hero-image"></div>
        <div id="hero-text-container">
            <h1 id="top-hero-text" className="hero-text">Find your trail in Cumbria</h1>
            <h1 id="bottom-hero-text" className="hero-text">without the subscriptions</h1>
            <p className="hero-subtitle">Simple. Accurate. Completely free.</p>

            { /** CTA button ( create a free account */}
            <button type="button" id="hero-create-account-button" className="button cta-button" onClick={switchToMap} >Try it now</button>

        </div>
    </section>
}

export default Hero