# Routing Engine

---

**Last updated:** June 2026

---

The core of Crestr’s route generation is a custom **A\* pathfinding** implementation, 
heavily optimised for large hiking networks and realistic hiking costs.

## Overview

The routing engine finds the lowest-cost path between two points on the enriched graph while respecting user preferences
such as minimum slope tolerance. 

It combines:

- Accurate **Naismith-based edge costs** (from the elevation pipeline)
- **Euclidean heuristic** with elevation penalty
- **Spatial optimisation** using a global KDTree and dynamic subgraph extraction

## Key Components

### 1. AStarRouteFinder Class

The main implementation of the A\* algorithm:

- **Priority Queue** (`nodes_left`): Uses `heapq` to always expand the most promising node next.
- **Cost Tracking**:
  - `actual_cost`: Real cost from start to current node
  - `full_cost`: `actual_cost + heuristic`
- **Early Termination**: Returns as soon as the destination node is dequeued.
- **Slope Filtering**: Skips edges that violate the user’s `min_slope` preference.

### 2. Heuristic Function

A fast, admissible heuristic that estimates remaining time:

- Straight-line (Euclidean) distance at 1.4 m/s base speed
- Additional penalty for elevation difference to the destination
- Guarantees optimality while guiding the search efficiently

### 3. Spatial Optimisation (`a_star` function)

Because the full graph is large, the engine uses several techniques to reduce computation:

- **Global KDTree**: Built once for fast nearest-neighbour lookups.
- **Radius-based Subgraph**: Extracts a relevant portion of the graph around the start and end points.
- **Bounding Box Culling**: Further removes nodes outside the search area.
- **Snapping**: Snaps the user’s clicked coordinates to the nearest actual trail node.

These optimisations make routing feel instantaneous even on a dense national trail network.

## Algorithm Flow

1. Snap start and end coordinates to the nearest trail nodes using KDTree.
2. Build a focused subgraph around the route corridor.
3. Run A\* on the subgraph using precomputed edge costs.
4. Reconstruct and return the path.

## Design Decisions

- **Why A\*?**  
  It guarantees the optimal path when using an admissible heuristic, while being significantly faster than Dijkstra in practice.
  The use of a heuristic allows me to tune the algorithm to the specific needs of my app making pathfinding highly customisable.

- **Precomputed Costs**  
  All elevation, terrain, and Naismith calculations are done once during preprocessing.
  The routing engine only reads these values.

- **Scalability**  
  The combination of KDTree + subgraph extraction allows the engine to scale to 1M+ node graphs without excessive memory or CPU usage.

- **Customisability**  
  The `min_slope` parameter enables future features such as “avoid steep sections”.

## Performance Characteristics

- Typical routing time: well under 1 second on regional graphs (distance approx 5-7km).
- Memory efficient due to subgraph extraction.
- Scales with trail density rather than total graph size.

## Future Improvements

- Bidirectional A\* for even faster searches.
- Support for multi-criteria optimisation (e.g. shortest vs least ascent).
- Caching of common routes.
- Real-time dynamic obstacles or closures.
- Integration with live weather / trail conditions.

## Related Documents

- [Tech Stack](./tech-stack.md)
- [KDTree](./kdtree.md)
- [Elevation Pipeline](./elevation.md)
- [Architecture Overview](./architecture.md)
