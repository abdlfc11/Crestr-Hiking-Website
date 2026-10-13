# Frontend Architecture

---

**Last updated:** September 2026

---

The frontend of Crestr is a **single-page application** built with vanilla Typescript and **OpenLayers** for mapping.
It provides an interactive hiking route planner with manual and automatic routing modes.

## Technology Stack

- **OpenLayers** – Interactive mapping, layers, and vector features
- **Vanilla Typescript** – Modular ES6 modules with clean separation of concerns
- **Chart.js** – Elevation profile visualisation
- **HTML/CSS** – Semantic markup and responsive design

No heavy frontend frameworks are used, keeping the bundle size small and performance high on mobile devices.

## Module Structure

```
frontend/
├── init/                            # Map and icon initialisation
├── ui/                              # Main UI logic, mode switching, event handlers
├── auth/                            # Login, registration, logout, account management
├── settings.js / settingsState.js   # User preferences (units, theme)
├── routes/                          # Route creation, saving, loading, state
├── utils/                           # Shared helpers (formatting, coordinate rounding, etc.)
├── saved_points/                    # Saved location markers
├── cursorManager.js                 # Smart cursor control during route creation
├── elevationChart.js                # Dynamic elevation profile
├── importRoute.js                   # GPX/KML/FIT/GeoJSON import             
```

## Key Design Patterns

- **State Management**: Centralised route and settings state (`routeState.ts`, `settingsState.ts`)
- **Modular Architecture**: Small, focused modules with clear exports
- **Coordinate Normalisation**: Robust handling of Web Mercator ↔ WGS84 conversions with elevation support
- **Performance**: Cursor management, layer management, and lazy loading of saved points

## Core Features

### Routing

- Click-to-draw custom routes with snap-to-path and real-time distance, ETA and elevation profiles 
- Basic route editing via moving start, end or intermediary points in a route  

### Saved Content

- User-saved points of interest
- Named routes with persistent storage
- Import from GPX, KML, FIT, GeoJSON

### Visual Feedback

- Dynamic elevation chart (Chart.js)
- Real-time route statistics (distance, ETA, elevation profile)
- Dark/light/system theme support

## Data Flow

1. User interaction on map
2. Coordinate processing and validation
3. API call to FastAPI backend (`/routing/calculate-path`, etc.)
4. Response --> update map layers, stats panel, elevation chart
5. Optional persistence to PostgreSQL via backend

## Strengths

- Excellent mapping performance thanks to OpenLayers
- Clean separation between UI, state, and map logic
- Strong coordinate handling and projection management
- Responsive and accessible interface

## Current Limitations

- Vanilla TS requires disciplined module organisation (no reactivity)
- All state is in-memory + localStorage (server sync on key actions)
- Some duplication between manual and loaded route display logic

## Future Improvements

- Consider migrating high-frequency UI updates to a lightweight reactive library if complexity grows
- Progressive Web App (PWA) capabilities / WASM for offline route viewing
- Component-based structure for easier maintenance
- Better design of app on mobile interfaces 

## Related Documents

- [Tech Stack](./tech-stack.md)
- [Backend API](./backend-api.md)
- [Routing Engine](./routing-engine.md)

