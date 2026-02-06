# Open Overlay

**Open Source Real Time Collaboration Overlay Builder and Management**

Open Overlay lets you build and manage real-time overlays for livestreams and other use cases.  
Self-hostable, extensible, and built with a modern TypeScript stack.

---

## 🛠️ Tech Stack

### Backend

- Node
- Typescript
- Express
- Drizzle ORM
- betterAuth

### Frontend

- React
- Typescript
- shadcn

---

## 🚀 Getting Started

### 1. Environment Setup

Copy the environment template and adjust it to your needs:

```bash
cp .env.template .env
```

See [Configuration](#configuration) for details.

### 2. Build Containers

```bash
docker compose build
```

### 3. Start Services

```bash
docker compose up -d
```

### 4. Run Database Migrations

```bash
docker exec -it openoverlay-backend-1 npm run drizzle:migrate
```

### 5. Open the Web App

Visit the application in your browser:

```
http://<your-server-ip>:80
```

---

### Optional: Reverse Proxy

You can place Open Overlay behind any reverse proxy (e.g. Nginx, Traefik, Caddy).

Make sure to update the `URL` environment variable accordingly.
See [Configuration](#configuration).

---

## ⚙️ Configuration

### Database

- **POSTGRES_USER** – PostgreSQL username

- **POSTGRES_PASSWORD** – PostgreSQL user password

- **POSTGRES_DB** – PostgreSQL database name

- **DATABASE_URL** – PostgreSQL connection string

  ```
  postgresql://username:password@host:port/db
  ```

### App

- **URL** – Public URL where the frontend is reachable

### Authentication (Google OAuth)

- **GOOGLE_CLIENT_ID** – Google OAuth Client ID
- **GOOGLE_CLIENT_SECRET** – Google OAuth Client Secret

Create credentials in the
[Google Cloud Console](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid?hl=de)

---

## 📄 License

OpenOverlay is [Apache 2.0 licensed](LICENSE)
