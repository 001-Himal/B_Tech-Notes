# Unit 6 — Docker CLI & Compose Cheat Sheet

A minimal, practical reference for container lifecycle, image building, volume storage, virtual networking, and **Docker Compose**.

---

## 1. Core Technical Definitions

> **Image vs Container:** An Image is an immutable, read-only template with stacked filesystem layers; a Container is an isolated, running instance with a writable top layer.
>
> **Volume vs Bind Mount:** A Volume is fully managed by Docker in host storage (`/var/lib/docker/volumes`); a Bind Mount maps any exact directory on the host directly into the container.
>
> **Bridge Network:** The default private virtual software switch allowing containers on the same host network to communicate via IP or DNS container names.
>
> **Docker Compose:** Declarative orchestration tool defining multi-container applications, volumes, and networks inside a single `compose.yaml` file.

---

## 2. Container Lifecycle

| Command | Purpose | Example |
|---|---|---|
| `docker run` | Create and start a container from an image | `docker run -d -p 8080:80 --name web nginx:alpine` |
| `docker ps` | List running containers | `docker ps` |
| `docker ps -a` | List all containers (running + stopped) | `docker ps -a` |
| `docker stop` | Gracefully stop running container (`SIGTERM`) | `docker stop web` |
| `docker start` | Start a stopped container | `docker start web` |
| `docker restart` | Restart a container | `docker restart web` |
| `docker kill` | Force kill a container immediately (`SIGKILL`) | `docker kill web` |
| `docker rm` | Remove stopped container | `docker rm web` |
| `docker rm -f` | Force remove running container | `docker rm -f web` |

### Common `docker run` Flags

```text
-d             → detached mode (runs in background)
-p 3000:80     → map host port 3000 to container port 80
-v host:cont   → mount host directory / volume into container
-e KEY=val     → pass environment variable
--name myapp   → assign custom container name
--restart=always → automatically restart container if it crashes or on boot
--rm           → automatically delete container when it stops
```

---

## 3. Container Debugging & Inspection

| Command | Purpose | Example |
|---|---|---|
| `docker logs` | Fetch stdout and stderr logs of container | `docker logs -f --tail 50 web` |
| `docker exec` | Execute a command inside a running container | `docker exec -it web /bin/sh` |
| `docker inspect` | Return detailed low-level JSON configuration | `docker inspect web` |
| `docker stats` | Live stream of container CPU, Memory, and I/O | `docker stats` |
| `docker top` | Display running processes inside container | `docker top web` |
| `docker port` | List port mappings for container | `docker port web` |
| `docker cp` | Copy files between container and host filesystem | `docker cp ./app.conf web:/etc/nginx/` |

---

## 4. Docker Image Management

| Command | Purpose | Example |
|---|---|---|
| `docker build` | Build image from Dockerfile | `docker build -t myapp:1.0 -f Dockerfile .` |
| `docker images` | List local Docker images | `docker images` |
| `docker pull` | Download image from Docker Registry / Hub | `docker pull postgres:16-alpine` |
| `docker push` | Upload image to registry | `docker push myuser/myapp:1.0` |
| `docker tag` | Create an alias tag for an existing image | `docker tag myapp:1.0 myapp:latest` |
| `docker rmi` | Remove one or more local images | `docker rmi node:18-alpine` |
| `docker history` | Show layers and build steps of an image | `docker history myapp:1.0` |

### Important Build Options

```text
docker build -t app:latest .     → build from current directory Dockerfile
docker build --no-cache -t app . → build without using cached layers
docker build --target builder .  → build up to a specific multi-stage build target
```

---

## 5. Volumes & Persistent Storage

| Command | Purpose | Example |
|---|---|---|
| `docker volume create` | Create a named persistent volume | `docker volume create pg_data` |
| `docker volume ls` | List all existing volumes | `docker volume ls` |
| `docker volume inspect` | Display volume mountpoint on host disk | `docker volume inspect pg_data` |
| `docker volume rm` | Delete an unused volume | `docker volume rm pg_data` |
| `docker volume prune` | Remove all unused local volumes | `docker volume prune -f` |

### Mounting Volumes in `docker run`

```bash
# Named volume:
docker run -d -v pg_data:/var/lib/postgresql/data postgres:16

# Bind mount (host directory directly into container):
docker run -d -v $(pwd)/src:/app/src -p 3000:3000 node:20
```

---

## 6. Container Networking

| Command | Purpose | Example |
|---|---|---|
| `docker network create` | Create user-defined bridge network | `docker network create app-net` |
| `docker network ls` | List all local Docker networks | `docker network ls` |
| `docker network inspect` | View connected containers and IP allocations | `docker network inspect app-net` |
| `docker network connect` | Connect running container to network | `docker network connect app-net web` |
| `docker network disconnect` | Disconnect container from network | `docker network disconnect app-net web` |
| `docker network rm` | Remove user-defined network | `docker network rm app-net` |

---

## 7. System Clean-up & Housekeeping

| Command | Purpose | Example |
|---|---|---|
| `docker system df` | Show Docker disk space consumption | `docker system df` |
| `docker system prune` | Remove stopped containers, dangling images & networks | `docker system prune` |
| `docker system prune -a` | Deep clean: purge **all** unused images and containers | `docker system prune -a --volumes` |

---

## 8. Docker Compose CLI (`docker compose`)

| Command | Purpose | Example |
|---|---|---|
| `docker compose up` | Build, create, and start services defined in `compose.yaml` | `docker compose up -d` |
| `docker compose down` | Stop and remove containers, networks, and volumes | `docker compose down -v` |
| `docker compose ps` | List status of all compose services | `docker compose ps` |
| `docker compose logs` | View aggregated logs from all services | `docker compose logs -f --tail 100` |
| `docker compose exec` | Execute interactive command inside service container | `docker compose exec db psql -U postgres` |
| `docker compose restart` | Restart all or specific service | `docker compose restart api` |
| `docker compose build` | Rebuild images defined in compose file | `docker compose build --no-cache` |
