# KDTree Spatial Indexing

---

**Last updated:** June 2026

---

Crestr uses a **KDTree** to enable fast spatial queries on the trail network.
This is a critical performance component of the routing engine.

## What is a KDTree?

A KDTree (K-Dimensional Tree) is a space-partitioning data structure that organises points in a k-dimensional space. 
It allows efficient nearest-neighbour searches and range queries.

In Crestr, we use the `scipy.spatial.KDTree` implementation, which is well-suited for 2D geospatial coordinates.

**Key Properties:**

- Construction time is O(n log n)
- Nearest-neighbour queries are O(log n) on average
- Excellent for static point sets (our trail nodes change only during preprocessing)

See the official documentation: [scipy.spatial.KDTree](https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.KDTree.html)

## Usage in Crestr

The KDTree is used in two main places:

### 1. Global Index (`build_global_kdtree`)

- Built once at application startup from all nodes in the graph.
- Stores every trail node coordinate for rapid lookup.
- Enables quick snapping of user-selected start and end points to the nearest actual trail nodes.

### 2. Route Corridor Search (`a_star` function)

When a user requests a route:

- A bounding box and radius are calculated around the start and end points.
- The global KDTree performs a `query_ball_point` to retrieve only the candidate nodes likely to be relevant.
- A much smaller subgraph is created from these candidates, dramatically reducing the search space for A*.

## Why KDTree?

- **Performance**: Without it, snapping or filtering would require scanning every node in the graph;
too slow for a responsive user experience.
- **Simplicity**: The SciPy implementation is robust, well-tested, and requires minimal code.
- **Memory Efficiency**: The tree itself is relatively lightweight compared to the full graph.

## Trade-offs

- The tree is rebuilt only when the underlying graph changes (during preprocessing). This is acceptable because the graph is
static between builds.
- For extremely large national-scale graphs, a more advanced spatial index may eventually be required.

## Future Considerations

- Evaluate switching to an **R-tree** (or hybrid KDTree + R-tree approach) for better handling of range queries and
rectangle-based filtering on very large graphs.
- Investigate approximate nearest neighbours for even faster snapping on mobile devices.
- Potential use for additional features such as “find nearest trailhead” or dynamic point-of-interest queries.

## Related Documents

- [Routing Engine (A*)](./routing-engine.md)
- [Elevation Pipeline](./elevation.md)
- [Tech Stack](./tech-stack.md)

