---

**Last updated:** July 2026

---

Follow this guide to set up and run **Crestr** locally for development.

## Prerequisites

Before starting, ensure you have the following installed:

- **Git** - To clone the repository
[Download Git](https://git-scm.com/downloads)
- **Docker** & **Docker Compose** - The app runs locally via Docker containers
  - Docker Desktop: [Install Docker](https://docs.docker.com/get-docker/)
  - Docker Compose is included with Docker Desktop (v2+)
- **Python 3.11+** - If running the FastAPI app outside of Docker

---

## 1. Clone the Repository

```bash
# Clone the project
git clone https://github.com/abdlfc11/Crestr-Hiking-App.git

# Navigate into the project folder
cd Crestr-Hiking-App
```

You should see a project structure similar to this:

```
Crestr-Hiking-App/
├── docker-compose.yml
├── Dockerfile
├── src/
│   ├── app.py
│   ├── pathfinder.py
│   └── config.py
|   └── ...
├── data/
├── README.md
└── requirements.txt
└── .env.example
└── ...
```

## 2. Set Up Your `.env` File

Copy the example configuration:

```bash
cp example.env .env
```

Then edit the values you wish to change.

At minimum you'll need to replace:

- `LOCATIONIQ_API_KEY`
- `POSTGRES_PASSWORD`
- `PGADMIN_PASS`
- `UMAMI_APP_SECRET`

### Important: `docker-compose.yml` reads from `.env`, not `example.env`

Docker Compose expects a `.env` file in the project root for variable interpolation.
Therefore, after cloning the repository, copy `example.env` to `.env` before starting the stack via the command below

```sh
cp example.env .env
```

Without this file, services such as pgAdmin and Umami will fail to start correctly

## 3. Build and Start the App

### Option A — Full stack via Docker (recommended for working on the full app, DB, analytics, pgAdmin)

```sh
docker-compose up --build
```

Useful variants:

```sh
docker-compose up --build -d          # build and start in the background (detached)
docker-compose up --build --force-recreate  # force rebuild and restart all services
docker-compose logs -f                # follow logs in real time
```

For faster local iteration, you'll also want to swap the `command:` on the `web-fastapi` service from the gunicorn prod command to the Uvicorn command for easier debugging:

```sh
### command: gunicorn -c src/gunicorn.config.py fastapi_app:app # Prod
command: uvicorn fastapi_app:app --reload --host 0.0.0.0 --port 5001 # DEVELOPERS: use this command
```

### Option B: Run FastAPI natively (no Docker), useful for fast backend-only iteration

You'll still need Postgres running (e.g. via `docker-compose up db`), then:

```sh
# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI app
uvicorn src.fastapi_app:app --reload --host 0.0.0.0 --port 5001
```

Make sure `LOCAL_DATABASE_URI` in your `.env` points at `localhost` (not the `db` service hostname), since you're running outside the Docker network.

## 4. Access the App

Once containers/services are up, the app is accessible at [localhost:5000](http://localhost:5000), opening on the map.

Create an account to save routes and points at [localhost:5000/register-page](http://localhost:5000/register-page).

Other local services:

- Umami analytics: [localhost:3000](http://localhost:3000)
- pgAdmin: [localhost:5050](http://localhost:5050) (or whatever `PGADMIN_PORT` you set)

## 5. Common Issues + Troubleshooting

| Issue | Solution |
|---|---|
| Port 5000 already in use | Change the port mapping in `docker-compose.yml` |
| Docker permission error | Run with `sudo` (Linux) or ensure Docker Desktop is running |
| Build fails | Run `docker system prune -f` and try again |
| `umami`/`pgadmin` won't start or has blank credentials | Confirm you have a `.env` file (not just `example.env`) in the project root — see Step 2 |

