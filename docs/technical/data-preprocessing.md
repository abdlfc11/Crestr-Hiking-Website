# Data Preprocessing

---

**Last updated:** July 2026

---

Crestr’s routing engine is built on a preprocessed graph derived from OpenStreetMap (OSM) data.
This document outlines the full preprocessing pipeline, the structure of the resulting graph, and the reasoning behind the design choices.
The aim is to give contributors a clear understanding of how raw geographic data becomes the elevation‑aware,
cost‑weighted graph used by the A* routing engine.

---

## Node and Edge Structure

The graph is stored as a directed iGraph graph. Nodes and edges follow a minimal, performance‑oriented schema.

### Node Structure

Nodes are stored as coordinate tuples in British National Grid (EPSG:27700): Each node is indexed via 0-based indexing, with each having the following attributes:

- Coordinate (in Web Mercator): Stored as a tuple with each coordinate being stored as a float
- Elevation: Stored as a float

> Note: Coordinates are likely to be changed to be stored in Lat/Lon format, to make the process of calculating distances easier as well as to align with conventional and industry standards

```python
Node : (id: int)

{
    'elev': float # elevation in metres
    'coordinate': float # coordinate in web mercator projection (EPSG: 3857) 
}
```

**Example:**

```python
Node : (3)

{
    'elev': 121.0
    'coordinate': (-357542.43, 7256711.32)
}
```

### Edge Structure (Before Elevation Enrichment)

Edges represent **directed segments** between nodes. During graph generation, edges may contain **raw OSM metadata** when available.

Edges are stored in tuple format with two values, the first value is the starting point for the edge and is an integer representing a node in the graph, and the second value is the end point for the edge, also representing a node in the graph.

Each edge then has a length attribute which is stored as a float as well as the following OSM tag-derived attributes (all in string format):

- sac_scale
- trail_visibility
- surface

```python
Edge : (node_id_1: int, node_id_2: int)

{
    'length': [VALUE: float], 
    'sac_scale': [VALUE: str]
    'trail_visibility': [VALUE: str]
    'surface': [VALUE: str]
}
```

These values are taken directly from OSM without transformation. Many edges will **not** contain these tags, as OSM coverage varies.

### Edge Structure (After Elevation Enrichment)

During elevation enrichment, raw tags are converted into numeric difficulty multipliers which is then multiplied with the `length` attribute to form the `cost` attribute. The final graph used by the routing engine stores:

```python
Edge : (node_id_1: int, node_id_2: int)

{
    'length': [VALUE: float], 
    'cost': [VALUE: float], 
    'slope': [VALUE: float]
    }
```

**Example:**

```python
Edge : (3, 7)

{
    ‘length’: 37.9183,
    ‘cost’: 39.0845,
    ‘slope’: 0.0527
}
```

---

## Preprocessing Pipeline Overview

The preprocessing workflow consists of three stages:

1. **Osmium Tag Extraction**  
Ensures that relevant OSM metadata is preserved before parsing.
2. **Graph Generation**  
Converts OSM geometries into a directed graph using [Pyrosm](https://pyrosm.readthedocs.io/en/latest/), [Shapely](https://shapely.readthedocs.io/en/stable/), and [iGraph](https://igraph.org)
3. **Elevation Enrichment**  
Adds [NASA SRTM](https://www.earthdata.nasa.gov/data/instruments/srtm) elevation data, computes slope, and assigns cost values.

This pipeline produces a clean, lightweight graph optimised for hiking‑focused routing.

---

## Osmium Tag Extraction

Before parsing, the `.osm.pbf` file is passed through Osmium to ensure that metadata such as `sac_scale`, `trail_visibility`, and `surface` is retained.

Command:

```bash
osmium cat input.osm.pbf -o output.osm.pbf
```

These tags are used later to influence cost multipliers, allowing the routing engine to avoid paths that are unsafe or technically difficult.

---

## Graph Generation

Graph generation is handled by a Python script that uses:

- **Pyrosm** to extract highway geometries
- **Shapely** to process LineString and MultiLineString geometry
- **iGraph** to construct the directed graph

Each OSM way is split into coordinate pairs. Coordinates are rounded to two decimal places (or 6 decimal places if using Lat/Lon projection) to reduce node duplication while maintaining spatial accuracy.

### Node Creation

Each coordinate pair is assigned to the `coordinate` attribute of a node and at this stage, nodes only consist of a specific integer ID and their `coordinate` attribute.

### Edge Creation

For each pair of consecutive coordinates, a directed edge is created in both directions. Attributes include:

- `length`: Euclidean distance in metres
- raw OSM tags (if present): `sac_scale`, `surface`, `trail_visibility`

These tags remain as raw strings until elevation enrichment.

---

## Elevation Enrichment

A second script enriches the graph with elevation data from NASA SRTM tiles. This stage performs three tasks:

**1. Elevation Assignment**

Each node receives an `elev` attribute in metres.

**2. Slope Calculation**

For each edge:

`slope = (elevation difference) / length`   **(only if length > 0)**

**3. Cost Calculation**

A dictionary of difficulty multipliers maps raw OSM tag values to numeric weights.

The multiplier is applied to ascent or descent depending on elevation change.

The final cost is stored in the **`cost` attribute**.

After enrichment, edges contain only **`length`, `slope`, and `cost`**, as these are the values required by the routing engine.

---

## Output

The final output is a **directed, elevation‑aware iGraph** graph with approximately:

- **1,000,000** nodes (for the Cumbria region)
- **2,000,000** directed edges
- **`elevation`**, **`slope`**, and **`cost`** attributes

This graph is cached on disk and loaded once at backend startup.

---

## Design Rationale

The preprocessing pipeline is designed to keep the runtime graph as lightweight as possible:

- Nodes store only **`coordinates` and `elevation`**.
- Edges store only the **attributes required for routing**.
- Raw OSM tags are used only during cost calculation and are **not retained** afterward.
- The graph is **fully deterministic and reproducible** from the preprocessing scripts.

This structure ensures that A* remains **fast and memory‑efficient** even on large regional datasets.