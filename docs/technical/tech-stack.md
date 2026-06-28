# Tech Stack

---

**Last updated:** June 2026

---

This document outlines the current technology choices for Crestr. The stack prioritises simplicity and performance for geospatial operations, 
and maintainability while working within the constraints of a solo-developed project.

## Overview

| Layer          | Technology                          | Notes |
|----------------|-------------------------------------|-------|
| Frontend       | HTML, CSS, JavaScript, OpenLayers  | Client-side mapping and UI |
| Backend        | Python, Flask (primary), FastAPI (exploratory) | Web framework layer |
| Database       | PostgreSQL + SQLModel ORM        | Relational storage with ORM |
| Pathfinding    | Custom A* algorithm + KDTree spatial indexing | Core routing logic |
| Map Data       | OpenStreetMap (OSM) for nodes, OpenTopoMap for tiles, LocationIQ for reverse geocoding | Source of geographic data |
| Authentication | Flask session-based authentication | User session management |

## Detailed Breakdown

### Frontend

- **HTML, CSS, JavaScript**: Core web technologies. No heavy frameworks at present to keep bundle size small and performance high on mobile devices during hikes.
- **OpenLayers**: Chosen for interactive mapping capabilities, vector layer support, and strong OSM integration. Provides the foundation for route display and user interaction.

### Backend

- **Python**: Primary language due to strong ecosystem support for geospatial libraries and rapid development.
- **Flask**: Current main web framework. Lightweight, flexible, and sufficient for the current scope.
- **FastAPI**: Being evaluated for potential migration. Offers better performance, automatic OpenAPI documentation, and modern async support. The project currently uses only Flask.

### Database

- **PostgreSQL**: Robust, open-source relational database with excellent GIS extensions (PostGIS planned for future spatial queries).
- **SQLModel**: Provides an abstraction layer, reducing syntax and boilerplate, and supports migrations via Alembic.

### Core Algorithms

- **A* Pathfinding**: Custom implementation tailored to hiking constraints (elevation, terrain difficulty, preferences).
- **KDTree**: Used for efficient spatial nearest-neighbour searches when indexing OSM data.

### Data Sources

- **OpenStreetMap (OSM)**: Primary source of trail, elevation, and land-use data.
- Future plans include PostGIS for better querying.

### Authentication & Security

- **Flask sessions**: Simple server-side session management. Suitable for current user base but will need review before scaling (consider JWT or OAuth2 for API clients).

## Design Principles

- Keep the stack minimal to reduce operational overhead.
- Favour open-source and community-supported tools.
- Ensure the architecture supports incremental improvements without major rewrites.

## Future Considerations

- Evaluate migration from Flask to FastAPI once API surface grows.
- Introduce PostGIS for advanced spatial queries.
- Review authentication model for security best practices before handling sensitive user data or payments.

## Rationale
Choices were driven by the need for strong geospatial capabilities, developer velocity, and long-term maintainability. 
The current stack allows rapid iteration while avoiding unnecessary complexity.

