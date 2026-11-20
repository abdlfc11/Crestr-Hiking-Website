# Architecture Overview

---

**Last updated:** November 2026

---

This document provides a high-level view of Crestr’s system architecture,
how the major components interact, and the design principles guiding development.

## High-Level Design

Crestr follows a **static-first, precomputed** architecture optimised for performance and reliability in a hiking route planning application.

### Core Layers

- **Frontend**: Static HTML/CSS/TypeScript with OpenLayers for interactive mapping
- **Routing Engine**: BRouter Docker container
- **Backend**: Lightweight FastAPI application serving APIs (auth, routing etc)
- **Data Storage**: BRouter `.rd5` files

## Component Diagram

User

↓(1) ↑(6)

Frontend: OpenLayers + TS

↓(2) ↑(5)

Backend: FastAPI API

↓(3) ↑(4)

Routing Engine: BRouter

## Technology Choices Summary

See [Tech Stack](./tech-stack.md) for full details.


## Current Limitations

- Limited multi-user / concurrency support (easily achieved via FastAPI async support)

## Future Evolution

- Potential internationalisation and sponsorship pathway for production use.

## Related Documents

- [Tech Stack](./tech-stack.md)
- [Routing Engine (A*)](./routing-engine.md)
- [KDTree](./kdtree.md)
- [Elevation Pipeline](./elevation.md)
- [Data Preprocessing](./data-preprocessing.md)
