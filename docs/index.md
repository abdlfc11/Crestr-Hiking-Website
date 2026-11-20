<p align="center">
  <img src="./assets/images/Crest-Logo.png" width="200">
  <br>
  <p><i>Crestr is an open-source, hiking route planner for the UK and Ireland, aiming to make hiking more accessible</i></p>
</p>

<p align="center">
  <a href="user/getting-started.md" class="md-button md-button--primary">
    Get Started
  </a>
  <a href="user/routing.md" class="md-button md-button--primary">
  User guide
  </a>
</p>

---

# Quick Start

``` bash
# clone the repo
git clone https://github.com/abdlfc11/Crestr-Hiking-App.git

# go to the project directory
cd Crestr-Hiking-App

# create a docker container for the app
docker-compose up --build
```
Finally, access the app at [http://localhost](http://localhost){:target="_blank"}

# Features

Crest aims to give users the features they pay for in other apps such as:

- **An Interactive topographic map**: View paths and landmarks in detail at a high resolution
- **Snap-to-Path routing**: Between waypoints, routes are made which follow existing paths as opposed to being a straight line
- **Search**: Search for any area in Great Britain and the map will be taken there
- **POIs**: Save points of interest to your account
- **Export routes** in:
    - **GPX**: for GPS watches and handheld devices
    - **GeoJSON**: for Google Maps, Strava, OS Maps, and more
- **Import routes** in:
    - **FIT**
    - **GPX**
    - **GeoJSON**
