
---

**Last updated:** June 2026

--- 

## Explanation of the panels during Automatic Route Generation


<p align="center">
  <img width="1470" height="833" alt="image" src="https://images.crestr.co.uk/Auto-Routing-Tour.jpeg" />
  <br>
  <sub>An image clearly showing each of the 4 distinct panels on the automatic route generation mode</sub>
</p>

### Automatic and Manual toggles (In Red)
This part of the UI is where you can easily switch between Automatic Route Generation and Manual Route Creation. 
I often switch to manual routing whilst in automatic route generation when I find a more appealing path, and to reflect that the app fully handles switching modes smoothly.
If you switch modes whilst a route is already loaded, the route is wiped and the UI is refreshed to include the new manual routing elements (more on that below)

### Main Routing Panel (In Yellow)
This part of the UI is where you generate a route from. It includes:
- the start and end coordinate entries as well as the corresponding set coordinate buttons. 
- a clear path button, which differs from the home button in that it doesn't zoom out to the centre of Cumbria, allowing you to continue routing without being disrupted.


It shares two things with the manual routing panel, of which are:
- the home button
- the menu button



The home button clears all paths and entries and zooms out to the centre of the Lake District, allowing you to reset your session.
The menu button (as the name suggests) opens a menu from the left hand side where you can access settings as well as the saved routes dashboards, where you can load, delete, and most importantly, export your created routes.

### Route Stats Panel (In Green)
This part of the UI is where you can view the details of your created or loaded routes. 

It includes core details such as:

- ETA: This is calculated using Naismith's rule and is different depending on descent or ascent
- Distance: This is calculated via a complex web mercator equation I had to scour the internet for, I might make a blog post about it
- Elevation Change: The elevation used for this is **_somewhat_** accurate ([NASA SRTM data for those interested](https://www.earthdata.nasa.gov/data/instruments/srtm)). Better, more accurate datasets are being explored
- Elevation profile: This was made available via chart.js 

### Save Route Panel (In Purple)
This part of the UI is where you can save a route to the database. 
<br>

## Setting coordinates

You can either enter coordinates directly, or use the set coord buttons, which allow you to click a point on the map to place a coordinate into the corresponding start / end entry

Examples can be seen below:

### Using the Set Start/End Coordinate Buttons

When clicking either entry, the cursor will turn into a crosshair and the next click on the map will enter the relevant coordinate into the desired entry.
For cleaner UI and a better UX, the current active entry is always highlighted via a blue border, as well as a relevant placeholder message.
