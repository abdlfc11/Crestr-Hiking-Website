# Backend API

---

**Last updated:** June 2026

---

The backend of Crestr is a lightweight Python web application built with **Flask** (with plans to migrate to FastAPI). 
It serves the interactive map, handles authentication, stores user data, and executes routing requests.

## Architecture

The backend follows a classic monolithic structure suitable for the current scale of the application:

- **Flask App** (`app.py`): Main application with routes and auth.
- **Pathfinding Module** (`pathfinder.py`): Contains the A\* routing engine and spatial helpers.
- **Database Models** (`models.py`): SQLModel definitions for PostgreSQL.
- **NodeFinder Service**: Central class managing graph loading, coordinate conversions, and route building.

## Core Responsibilities

- User authentication and session management
- Saving and loading user routes and saved points
- Executing A* pathfinding requests
- File import/export (GPX, GeoJSON, KML, FIT)
- Search functionality via LocationIQ API
- Settings persistence

## Key Endpoints

### Authentication
- `POST /login`
- `POST /registering`
- `POST /logout`
- `POST /validate-beta-code`

### Routing
- `POST /calculate_path` --> Main endpoint that returns an optimised hiking route as GeoJSON
- `POST /save_route` --> Persists a generated route to the database
- `POST /load_route` --> Retrieves a saved route
- `POST /delete_route`

### Points of Interest
- `POST /save_point`
- `GET /get_saved_points`
- `POST /delete_point`

### File Handling
- `POST /download_route` --> Returns GPX or GeoJSON file
- `POST /import_route_file` –-> Supports GPX, FIT, KML, and GeoJSON uploads

### Other
- `GET /get_settings` / `POST /save_settings`
- `POST /search_area` –-> Location search

## Database

- **PostgreSQL** with **SQLModel** 
- Main tables: `user`, `route`, `point`, `settings`, `betacode`
- Routes and points are scoped to individual users

## Design Highlights

- **Rate Limiting**: Implemented via Flask-Limiter to protect against abuse.
- **Coordinate Handling**: Robust conversion between Web Mercator, WGS84, and BNG using [pyproj](https://pypi.org/project/pyproj/).
- **Graph Management**: Lazy loading of the large trail graph with KDTree optimisation.
- **Error Handling**: Consistent JSON responses and custom error pages.
- **Session Security**: Configured with secure defaults (ready for HTTPS).

## Current Limitations

- Flask is used for simplicity, but the codebase already has the start of the creation FastAPI components in some areas.
- All routing runs synchronously --> acceptable for current usage but will need review at scale.
- Beta code system is temporary.

## Future Migration Path

- Full migration to **FastAPI** for better performance, automatic documentation, and async support.
- Move heavy pathfinding to a separate microservice or background worker if needed.
- Add proper API authentication (JWT) for potential mobile or third-party integrations.

## Related Documents

- [Tech Stack](./tech-stack.md)
- [Routing Engine (A*)](./routing-engine.md)
- [Architecture Overview](./architecture.md)