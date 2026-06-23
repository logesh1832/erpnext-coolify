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

## Static demo page (`/mock-html`)

The repo also serves a self-contained HTML demo (`mock-html/index.html`) at
`https://erpnext.wisright.com/mock-html` via a small `nginx:alpine` service.

To wire it up in Coolify:

1. After deploying, open the **`mock-html`** service → **Domains**.
2. Enter `https://erpnext.wisright.com/mock-html` (internal port **80**).
3. Redeploy.

Coolify routes the `/mock-html` path to this service and everything else to ERPNext —
the longer path automatically takes priority, so the main app is unaffected. To change
the page, replace `mock-html/index.html` and redeploy.

---

## Multi-flow demo (`/demos`)

A larger, self-contained walkthrough lives in `demos/site/` and is served at
`https://erpnext.wisright.com/demos/` by its own `nginx:alpine` service (`demos`).
It is a landing page plus four interactive flows (outgoing, incoming, manual,
rejection+retry), each an iframe shell that steps through screen HTML files.

To wire it up in Coolify:

1. After deploying, open the **`demos`** service → **Domains**.
2. Enter `https://erpnext.wisright.com/demos` (internal port **80**).
3. Redeploy, then open `https://erpnext.wisright.com/demos/` (with trailing slash).

Coolify's Traefik **strips** the `/demos` prefix before forwarding, so the tree is
baked at the nginx root (overwriting the stock welcome page) and `nginx.conf` keeps a
defensive rewrite for non-stripping setups. Like `mock-html`, the files are baked into
the image (no bind mounts) so it deploys cleanly. To change the demo, replace files
under `demos/site/` and redeploy. Keep the flow folders together — `rejection-flow`
reuses `outgoing-flow/styles.css`.

---

## Deploy manually (without Coolify UI)

On the VPS:

```bash
git clone <this-repo-url> erpnext-coolify
cd erpnext-coolify
docker compose up -d
# wait 5-10 min
```

> The `frontend` service uses `expose: 8080` (internal only) so Coolify's reverse proxy
> routes the domain to it. If you run **without** Coolify and need direct host access,
> change `frontend` back to `ports: ["8080:8080"]` and open `http://<server-ip>:8080`.

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
