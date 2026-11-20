import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import "../styles/components/about.css"

interface AboutTemplate {
    heading: string;
    description: string;
}

interface AllAboutTemplates {
    aboutTemplates: AboutTemplate[];
}

export const aboutTemplates = [
    {
        heading: "What is Crestr?",
        description: "Crestr is a free, open source hiking route planner for the UK and Ireland. It lets you plan, save and download routes through a clean interface without clutter."
    },
    {
        heading: "How does Crestr generate hiking routes?",
        description: "Crestr calculates routes between your chosen points using detailed map and terrain data, factoring in elevation to give you a realistic estimate of walking time and difficulty. Options to fine-tune route preferences are planned for the future. Crestr uses a self-hosted BRouter instance as it's routing engine."
    },
    {
        heading: "Is Crestr really free?",
        description: "Yes. Crestr is completely free to use, with no subscriptions, paywalls or premium tiers. The project is supported by optional donations."
    },
    {
        heading: "How is Crestr different from other hiking apps?",
        description: "Crestr is built by hikers, for hikers, with a focus on simplicity and clarity. There are no ads, no subscriptions and no upselling, just a fast and reliable routing experience."
    },
    {
        heading: "Do I need an account?",
        description: "No. You can plan and generate routes without signing up. An account is only needed if you want to save routes and export / import them later."
    },
    {
        heading: "Is my data safe?",
        description: "Crestr only stores what's needed to save your routes and manage your account. Your data is never sold or shared with third parties."
    },
    {
        heading: "What features are planned for the future?",
        description: `The roadmap includes a mobile app, difficulty filters, more settings and much more.`
    },
    {
        heading: "Can I use Crestr offline?",
        description: "Not yet, but offline support is on the roadmap."
    },
    {
        heading: "How can I give feedback or report an issue?",
        description: "Crestr is shaped by feedback from the hiking community. Use the Report Issue button in the sidebar to report a problem or suggest a feature."
    }
];

const About = ({aboutTemplates}: AllAboutTemplates): React.JSX.Element => {

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleChangeExpanded = (index: number): void => {
        setExpandedIndex(prev => (prev === index ? null : index))
    };

    return (
        <section id="about-section">

            <h1 id="about-heading">About Crestr</h1>

            {
                aboutTemplates.map((template, index) => (
                    <div className="about-group-container" key={index}>
                        <article className={`about-group ${expandedIndex === index ? "open" : ""}`}>
                            <button className={"about-group-header-button"} onClick={() => {handleChangeExpanded(index)}} aria-expanded={expandedIndex === index ? "true" : "false"} aria-controls={`about-text-${index}`}>
                                <h2 className="about-group-header">{template.heading}</h2>
                                <span><IoChevronDown /></span>
                            </button>
                            <p className="about-group-text" id={`about-text-${index}`}>
                                {template.description}
                            </p>
                        </article>
                    </div>
                ))
            }


        </section>
    )
}

export default About
