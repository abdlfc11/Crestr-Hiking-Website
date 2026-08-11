import "../styles/components/features.css"

interface Feature {
    heading: string;
    description: string;
    imageUrl: string
    altText: string
}

interface allFeatures {
    features: Feature[];
}

export const features = [
  {
    "heading": "Plan Routes with Precision",
    "description": "Crestr generates an accurate elevation profile of automatically generated routes immediately upon the creation of the route.",
    "imageUrl": "https://images.crestr.co.uk/SCR-20260530-klgb.png",
    "altText": "Feature preview: Elevation Profile"
  },
  {
    "heading": "Save and Export Routes",
    "description": "Crestr lets you save routes as well as export them in either GPX or GeoJSON for free.",
    "imageUrl": "https://images.crestr.co.uk/Saved-Routes-Dashboard.png",
    "altText": "Feature preview: Saved Routes Dashboard showing route export and downloads"
  },
]

const Features = ({features}: allFeatures): React.JSX.Element => {
    return ( 
    
        <section id="feature-section">

            <h1 id="feature-heading">Features of Crestr</h1>

                {features.map((feature, index) => (
                    <div className="feature-block" key={index}>
 
                        <h2 className="feature-heading">{feature.heading}</h2>

                        <div className="feature-image">
                            <img src={feature.imageUrl} alt={feature.altText} loading="lazy" width="500" height="320" />
                        </div>

                        <p className="feature-description">
                            {feature.description}
                        </p>
                    </div>
                ))}

        </section>

    )
}

export default Features