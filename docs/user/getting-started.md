---

**Last updated:** June 2026

---

Follow this detailed guide to set up and run **Crestr** on your local machine.

## Prerequisites

Before starting, ensure you have the following installed:

- **Git** - To clone the repository  
[Download Git](https://git-scm.com/downloads)
- **Docker** & **Docker Compose** - The app runs locally via Docker containers
  - Docker Desktop: [Install Docker](https://docs.docker.com/get-docker/)
  - Docker Compose is included with Docker Desktop (v2+)

---

## Users

### 1. Clone the Repository

Open your terminal and run:

```bash
# Clone the project
git clone https://github.com/abdlfc11/Crestr-Hiking-App.git

# Navigate into the project folder
cd Crestr-Hiking-App
```

### 2. After cloning set up the .env file

You should see a project structure similar to this

```
Crestr-Hiking-App/
├── docker-compose.yml
├── Dockerfile
├── src/
│   ├── fastapi_app.py
│   ├── Pathfinding/
│   └── config.py
|   └── ... 
├── data/
├── README.md
└── requirements.txt
└── .env.example
└── ...
```

#### Follow the steps below to set up a .env file

##### Make a file named '.env' and copy the contents from the 'example.env' file

The contents of the example.env file is shown below

```bash
 # Application
ENVIRONMENT=production
SITE_DOMAIN=http://localhost

# APIs
LOCATIONIQ_API_KEY=your_locationiq_api_key

# PostgreSQL
POSTGRES_USER=crestr_dev
POSTGRES_PASSWORD=secure_hiking_password_2025
POSTGRES_DB=crestr_hiking

DATABASE_URI=postgresql://crestr_dev:secure_hiking_password_2025@db:5432/crestr_hiking
LOCAL_DATABASE_URI=postgresql://crestr_dev:secure_hiking_password_2025@localhost:5432/crestr_hiking

# pgAdmin
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASS=change_me
PGADMIN_PORT=5050

# Routing
GRAPH_PATH=graph_generation/elevation_populated_graph.pkl

# Umami
UMAMI_WEBSITE_ID=get_ID_from_umami
UMAMI_SCRIPT_URL=http://localhost:3000/script.js
UMAMI_DB_PASSWORD=change_this_to_a_strong_password
UMAMI_APP_SECRET=generate_a_long_random_secret
```

The app will work fine with these values unchanged excepting the searching for an area feature,
as this is achieved via the `LOCATIONIQ_API_KEY` of which you will need to retrieve your own from
[their website](https://locationiq.com)

### 3. Build and Start the App

Run the following command to build the Docker image and start all services

```bash
docker-compose up --build
```

#### Useful commands

```bash
docker-compose up --build -d # this builds and starts services in the background (detached mode)
docker-compose --build --force-recreate # this force builds everything and restarts services
docker-compose logs -f # this allows you to follow logs in real time
```

### 4. Access the App

Wait until the containers are running
  

Once they are, the app should  be accessible via [localhost:5000](http://localhost:5000), opening on the map.
You may want to make an account to save routes and points by visiting [localhost:5000/register](http://localhost:5000/register)

### 5. Common Issues + Troubleshooting

| Issue | Solution |
|---|---|
| Port 5000 already in use | Change the port in docker-compose.yml |
| Docker permission error | Run with sudo (linux) or ensure Docker Desktop is operational |
| Build fails | run docker system prune -f and try again |

