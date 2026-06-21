# ERPNext on Coolify

Self-host **ERPNext v15** (Frappe Framework) on a VPS using **Coolify**.

This repo gives you a ready-to-run `docker-compose.yml` that starts the full ERPNext
stack: the app, MariaDB database, Redis, background workers, scheduler and websocket.

> **You do not build anything for plain ERPNext.** Coolify downloads the official
> `frappe/erpnext` image and runs it together with MariaDB + Redis. Adding India GST
> (the `india_compliance` app) is an optional later step — see
> [`india-compliance/BUILD.md`](india-compliance/BUILD.md).

---

## Requirements
- A VPS with **Coolify installed**
- **8 GB RAM** recommended (4 GB minimum)
- A domain/subdomain (e.g. `erp.yourcompany.com`) with an **A record** pointing to the VPS IP

---

## Deploy on Coolify (recommended path)

1. In Coolify: **+ New** → **Docker Compose Empty** (NOT "Docker Image").
2. Paste the contents of [`docker-compose.yml`](docker-compose.yml) into the compose box.
   *(Or use **Public Repository** and point Coolify at this repo's URL — Coolify reads the
   `docker-compose.yml` automatically.)*
3. Click **Save**. Coolify lists all the services.
4. Open the **`frontend`** service → **Domains** → enter `https://erp.yourcompany.com`
   (internal port **8080**). This is the only service that gets a domain.
   Coolify issues the HTTPS certificate automatically.
5. Click **Deploy**.
6. **Wait 5–10 minutes.** The `create-site` container builds the database — this is the
   slow part and is normal. Watch the logs until it finishes.

### First login
- Open `https://erp.yourcompany.com`
- User: `Administrator`
- Password: `admin`
- **Change this password immediately.**

---

## Deploy manually (without Coolify UI)

On the VPS:

```bash
git clone <this-repo-url> erpnext-coolify
cd erpnext-coolify
docker compose up -d
# wait 5-10 min, then open http://<server-ip>:8080
```

---

## Security notes
- The default DB and admin passwords are `admin` (from the upstream sample). The database
  is **not** exposed to the internet (no published DB port), but you should still:
  - change the **Administrator** password right after first login, and
  - rotate the DB root password for a real production setup.

## Versions
- ERPNext / Frappe: **v15**
- MariaDB: **10.6**
- Redis: **6.2**

Pinned to v15 so the optional India Compliance app (see `india-compliance/`) stays compatible.
