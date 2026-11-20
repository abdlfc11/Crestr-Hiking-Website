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
    "description": "Create routes that follow real paths across the UK & Ireland. See distance, estimated time, and elevation gain update live, with an elevation profile generated as soon as the route is ready. Drop waypoints anywhere along the line to refine it without starting over.",
    "imageUrl": "https://images.crestr.co.uk/Routing.jpeg",
    "altText": "Feature preview: Routing in Crestr"
  },
  {
    "heading": "Save and Export Routes",
    "description": "Crestr lets you save routes as well as export them in either GPX or GeoJSON for free.",
    "imageUrl": "https://images.crestr.co.uk/Saved-Routes-Dash.png",
    "altText": "Feature preview: Saved Routes Dashboard showing route export and downloads"
  },
  {
    "heading": "Import existing routes",
    "description": "Upload GPX, GeoJSON, KML, or FIT files to load routes you’ve already made or downloaded elsewhere.",
    "imageUrl": "https://images.crestr.co.uk/Import-Route-Panel.png",
    "altText": "Feature preview: Import routes in FIT, GPX, or GeoJSON format"
  },
  {
    "heading": "Circular Routes",
    "description": "Create loop routes by placing your final point near the start, the app closes the loop automatically",
    "imageUrl": "https://images.crestr.co.uk/Circular-Route.jpeg",
    "altText": "Feature preview: Support for circular routes"
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
