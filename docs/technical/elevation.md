# Elevation Pipeline

---

**Last updated:** June 2026

---

This document explains how Crestr enriches the pathfinding graph with elevation data and 
uses it to produce realistic hiking times and route costs.

## Overview

The elevation pipeline is a one-time preprocessing step that:

1. Attaches accurate elevation values to every node in the graph.

2. Calculates realistic travel times for every edge using an enhanced version of **Naismith's Rule**.

3. Adjusts costs based on terrain difficulty, surface type, and trail visibility.

The result is a `better_path_graph.pkl` file that the routing engine uses for A* pathfinding.

## Process Steps

### 1. Node Elevation Assignment

- All node coordinates (stored in Web Mercator) are converted to WGS84.
- A digital elevation model (DEM) raster (`Cumbria-Elevation-File.tif`) is sampled at every node location using `rasterio`.
- Elevation values (in metres) are attached directly to each node as the `elev` attribute.
- NoData values are replaced with 0.

### 2. Edge Enrichment

For every edge in the graph, the pipeline performs the following calculations:

####**Horizontal Distance Correction**  
  - Accounts for Web Mercator distortion using the cosine of the midpoint latitude.

####**Elevation Difference & Slope**  
  - Computes the vertical gain/loss and slope ratio between the two nodes.

####**Naismith's Rule (Enhanced)**  
  Calculates realistic travel time by combining:

  - Flat walking time based on adjusted speed
  - Additional time for ascent (+10m = +1 minute)
  - Additional time for descent (+7.5m = +1 minute)

  Walking speed is dynamically adjusted according to slope steepness:

  - less than 5°: 1.4 m/s (gentle)
  - 5–12°: 1.1 m/s (moderate)
  - 12–25°: 0.8 m/s (steep)
  - over 25°: 0.5 m/s (extreme / scrambling)

####**Terrain Difficulty Multiplier**  
  Further adjusts cost using OSM tags:

  - `sac_scale`
  - `trail_visibility`
  - `surface`

### 3. Final Cost Assignment

Each edge receives a `cost` value in **seconds** (used directly by the A* algorithm). 

Additional attributes stored for filtering and debugging:

- `slope`
- `terrain_factor`
- `ascent` / `descent` attributes (used in the assinging of costs to edges)

## Key Files

- `Cumbria-Elevation-File.tif` – Source DEM raster
- `Pathfinding/new_path_graph.pkl` – Input graph
- `Pathfinding/better_path_graph.pkl` – Output enriched graph

## Design Decisions

###**Why Naismith's Rule?**  

  - It is a well-established hiking-specific model that balances distance and elevation. 
  - Our version improves accuracy by incorporating slope-dependent walking speed and terrain multipliers.

###**Precomputation vs Runtime**  

  - All elevation work is done once during preprocessing. This keeps routing queries extremely fast.

###**Accuracy Trade-offs**  

  - The pipeline uses a single DEM file. Future improvements could include higher-resolution rasters or dynamic fetching for other regions.

## Future Enhancements

- Support for multiple regional DEMs
- Integration of more advanced cost models (e.g. Tobler's Hiking Function)
- Real-time slope-based filtering options in the UI
