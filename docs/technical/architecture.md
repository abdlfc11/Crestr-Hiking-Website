# Architecture Overview

---

**Last updated:** June 2026

--- 

This document provides a high-level view of Crestr’s system architecture, 
how the major components interact, and the design principles guiding development.

## High-Level Design

Crestr follows a **static-first, precomputed** architecture optimised for performance and reliability in a hiking route planning application.

### Core Layers

- **Frontend**: Static HTML/CSS/JavaScript with OpenLayers for interactive mapping
- **Data Processing Pipeline**: Python scripts that build and enrich the trail graph
- **Routing Engine**: Custom A* implementation running in Python (called via backend)
- **Backend**: Lightweight Flask application serving the API and static documentation
- **Data Storage**: Precomputed NetworkX graph (Pickle) + OSM-derived data

## Data Flow

1. **Raw Data Ingestion**  
   OpenStreetMap extracts are processed into nodes and edges.

2. **Graph Enrichment** (Offline)  
   • Elevation assignment from DEM raster  
   • Naismith-based cost calculation  
   • Terrain factor application  
   • Produces `better_path_graph.pkl`

3. **Routing Request** (Runtime)  
   User selects start/end on map → Frontend sends coordinates to backend → A* engine returns optimised path.

4. **Response**  
   Path is returned to the frontend and visualised on the OpenLayers map.

## Key Design Principles

- **Performance First**  
    Heavy computation (elevation, graph enrichment) is done once during preprocessing. 
  
    Runtime routing must feel instant.

- **Separation of Concerns**  

    Data preprocessing is completely decoupled from routing.

    Routing logic is isolated in the `AStarRouteFinder` class.

- **Spatial Efficiency**  
    Global KDTree + dynamic subgraph extraction keeps memory and CPU usage low even on large graphs.

- **Simplicity & Maintainability**  
    Minimal external dependencies. 
    Core algorithms are custom but easy to reason about and extend.

- **Static Where Possible**
    The application avoids heavy databases or real-time servers in favour of precomputed artefacts.

## Component Diagram

User 

↓


Frontend: OpenLayers + JS

↓

Backend: Flask API

↓

Routing Engine: A* + KDTree

↓

Enriched Graph (Pickle)

↑

Preprocessing Pipeline

↑

OSM Data + DEM Raster


## Technology Choices Summary

See [Tech Stack](./tech-stack.md) for full details.

## Strengths

- Excellent routing performance on regional datasets.
- Clear separation between preprocessing and runtime paths.
- Easy to extend with new cost functions or filtering options.
- Low operational cost (static-first design).

## Current Limitations

- Currently tied to a single regional DEM and graph.
- Graph updates require full reprocessing.
- Limited multi-user / concurrency support (not needed yet).

## Future Evolution

- Tile-based processing
- Move toward a more scalable backend (FastAPI + optional database).
- Containerised deployment (Docker) for easier updates.
- Potential internationalisation and sponsorship pathway for production use.

## Related Documents

- [Tech Stack](./tech-stack.md)
- [Routing Engine (A*)](./routing-engine.md)
- [KDTree](./kdtree.md)
- [Elevation Pipeline](./elevation.md)
- [Data Preprocessing](./data-preprocessing.md)


