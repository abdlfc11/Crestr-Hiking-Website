# Backend API

---

**Last updated:** July 2026

---

The backend of Crestr is a lightweight Python web application built with **FastAPI**.  
It serves the interactive map, handles authentication, stores user data, and executes routing requests.

## Architecture

The backend follows a classic monolithic structure suitable for the current scale of the application:

- **FastAPI App** (`src/fastapi_app.py`): Main application with routes and auth.
- **Pathfinding Module** (`src/Pathfinding/pathfinder.py` and `src/Pathfinding/NodeFinder.py`) : Contains the A* routing engine and spatial helpers.
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

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`

### Routing

- `POST /routing/calculate-path` --> Main endpoint that returns an optimised hiking route as GeoJSON
- `POST /routing/save-route` --> Persists a generated route to the database
- `POST /routing/load-route` --> Retrieves a saved route
- `POST /routing/delete-route` --> Deletes a route via route name (also ensures current user owns route)
- `POST /routing/download-route` --> Returns GPX or GeoJSON file
- `POST /routing/import-route-file` –-> Supports GPX, FIT, KML, and GeoJSON uploads

### Points of Interest

- `POST /points/save_point`
- `GET /points/get_saved_points`
- `POST /points/delete_point`

### Other

- `GET /get_settings` / `POST /save_settings`
- `POST /search_area` –-> Location search

## Database

- **PostgreSQL** with **SQLModel**
- Main tables: `user`, `route`, `point`, `settings`, `session_table`, `action_log` and `issues`
- Routes and points are scoped to individual users

## Design Highlights

- **Rate Limiting**: Implemented via [FastAPI-Limiter](https://pypi.org/project/fastapi-limiter/) to protect against abuse.
- **Coordinate Handling**: Robust conversion between Web Mercator, WGS84, and BNG using [pyproj](https://pypi.org/project/pyproj/).
- **Graph Management**: Lazy loading of the large trail graph with KDTree optimisation.
- **Error Handling**: Consistent JSON responses and custom error pages.
- **Use of Sessions Table**: Mixed with Cookies to send cryptographic session IDs which are sent back to the backend on each (authentication-required) API call

## Current Limitations

- All routing runs synchronously --> FastAPI refactor has been shipped and so asynchronous calls should be started to be designed

## Future Migration Path

- Move heavy pathfinding to a separate micro-service or background worker if needed.

## Related Documents

- [Tech Stack](./tech-stack.md)
- [Routing Engine (A*)](./routing-engine.md)
- [Architecture Overview](./architecture.md)

