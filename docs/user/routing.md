**Last updated:** June 2026

--- 

## Explanation of the panels when making a route 


<p align="center">
  <img width="1470" height="833" alt="image" src="https://images.crestr.co.uk/Auto-Routing-Tour.jpeg" />
  <br>
  <sub>An image clearly showing each of the 4 distinct panels when making a route</sub>
</p>

### Main Routing Panel (In Red)
This part of the UI is where you generate a route from. It includes:

- The start and end coordinate entries as well as the corresponding set coordinate buttons. 
- An undo, redo and clear path button: The undo and redo buttons either remove an existing point or add a previously removed point. The clear path buttons clears both the route and panels associated with routing (such as the route statistics panel and save route toggle). 
- A home button: This is used to clear all inputs and zoom out to the centre of the UK

### Route Stats Panel (In Green)
This part of the UI is where you can view the details of your created or loaded routes. 

It includes core details such as:

- ETA: This is calculated using Naismith's rule and is different depending on descent or ascent
- Distance: This is calculated via the Haversine formula, with an error rate of ~0.5%
- Elevation Change: The elevation used for this is **_somewhat_** accurate for areas where the latitude is lower than 60º ([NASA SRTM data for those interested](https://www.earthdata.nasa.gov/data/instruments/srtm)). For areas with a higher latitude the elevation data used is more accurate, and is made by [Sonny](https://sonny.4lima.de/).
- Elevation profile: This was made available via chart.js 

### Save Route Panel (In Purple)
This part of the UI is where you can save a route to the database. 
<br>

## Setting coordinates

To set coordinates simply click on the map. 

Alternatively:
  - Enter coordinates directly
  - Use the set coord buttons, which allow you to click a point on the map to place a coordinate into the corresponding start / end entry
