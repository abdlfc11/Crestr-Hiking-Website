# Tech Stack

---

**Last updated:** July 2026

---

This document outlines the current technology choices for Crestr. The stack prioritises simplicity and performance for geospatial operations,
and maintainability while working within the constraints of a solo-developed project.

## Overview

| Layer | Technology | Notes |
|---|---|---|
| Frontend | HTML, CSS, JavaScript, OpenLayers | Client-side mapping and UI |
| Backend | Python and FastAPI | Web framework layer |
| Database | PostgreSQL + SQLModel ORM | Relational storage with ORM |
| Pathfinding | Custom A* algorithm + KDTree spatial indexing | Core routing logic |
| Map Data | OpenStreetMap (OSM) for nodes, OpenTopoMap for tiles, LocationIQ for reverse geocoding | Source of geographic data |
| Authentication | Sessions PostgreSQL table + Cookies | User session management |

## Detailed Breakdown

### Frontend

- **HTML, CSS, JavaScript**: Core web technologies. No heavy frameworks at present to keep bundle size small and performance high
- **OpenLayers**: Chosen for interactive mapping capabilities, vector layer support, and strong OSM integration. Provides the foundation for route display and user interaction.

### Backend

- **Python**: Primary language due to strong ecosystem support for geospatial libraries and rapid development.
- **Flask**: Current main web framework. Lightweight, flexible, and sufficient for the current scope.
- **FastAPI**: Current main web framework after migrating from Flask, which offers better performance, automatic OpenAPI documentation, and modern async support.

### Database

- **PostgreSQL**: Robust, open-source relational database with excellent GIS extensions (PostGIS planned for future spatial queries).
- **SQLModel**: Provides an abstraction layer, reducing syntax and boilerplate, and supports migrations via Alembic.

### Core Algorithms

- **A * Pathfinding**: Custom implementation tailored to hiking constraints (elevation, terrain difficulty, preferences).
- **KDTree**: Used for efficient spatial nearest-neighbour searches when indexing OSM data.

### Data Sources

- **OpenStreetMap (OSM)**: Primary source of trail, elevation, and land-use data.
- Future plans include PostGIS for better querying.

### Authentication & Security

- **Session pSQL table + Cookies:** Upon Login a cookie is sent containing a cryptographic session ID, this is compared to the session ID in the pSQL table upon each API call which requires authentication, this method keeps users logged in for 7 days (can be easily edited)

## Design Principles

- Keep the stack minimal to reduce operational overhead.
- Favour open-source and community-supported tools.
- Ensure the architecture supports incremental improvements without major rewrites.

## Future Considerations

- Introduce PostGIS for advanced spatial queries.

## Rationale

Choices were driven by the need for strong geospatial capabilities, developer velocity, and long-term maintainability.
The current stack allows rapid iteration while avoiding unnecessary complexity.

