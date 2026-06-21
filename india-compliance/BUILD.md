# Phase 2 — Add India GST (india_compliance)

Do this **only after** plain ERPNext is live and working.

The public `frappe/erpnext:v15` image does **not** include the `india_compliance` app, and
the app cannot be installed at runtime because its code lives inside the container and is
lost on restart. So we bake it into a **custom image**, then point the compose at that image.

You build the image **once**. You do not write a Dockerfile — Frappe provides the build
recipe; you only provide [`apps.json`](apps.json) (the app list in this folder).

---

## Build the custom image (on the VPS, over SSH)

```bash
# 1. Get Frappe's official build tooling
cd ~
git clone https://github.com/frappe/frappe_docker
cd frappe_docker

# 2. Copy the apps.json from this repo into place (or recreate it here)
#    It must list erpnext + india_compliance on version-15.

# 3. Encode it as base64 (the build expects this)
export APPS_JSON_BASE64=$(base64 -w 0 apps.json)

# 4. Build the image (~10-15 min)
docker build \
  --build-arg=FRAPPE_PATH=https://github.com/frappe/frappe \
  --build-arg=FRAPPE_BRANCH=version-15 \
  --build-arg=APPS_JSON_BASE64=$APPS_JSON_BASE64 \
  --tag=erpnext-india:v15 \
  --file=images/custom/Containerfile .

# 5. Confirm it exists
docker images | grep erpnext-india
```

---

## Use the custom image in the deployment

1. In `docker-compose.yml`, replace **every** `image: frappe/erpnext:v15` with:

   ```yaml
   image: erpnext-india:v15
   pull_policy: never
   ```

   `pull_policy: never` tells Docker the image is already built locally — don't try to
   pull it from the internet.

2. In the `create-site` command, change the install line so it also installs the app:

   ```bash
   bench new-site --mariadb-user-host-login-scope='%' \
     --admin-password=admin --db-root-username=root --db-root-password=admin \
     --install-app erpnext --install-app india_compliance \
     --set-default frontend;
   ```

3. Redeploy in Coolify.

> If you already created the site as plain ERPNext, instead of recreating it you can
> install the app on the running site:
> `bench --site frontend install-app india_compliance` (run inside the `backend` container),
> but the image must contain the app first (steps above), otherwise it won't persist.

---

## Note on versions
`apps.json` uses `version-15` for both apps so they stay compatible. If you move ERPNext to
v16 later, switch both branches to `version-16` and rebuild — keep them matched.
