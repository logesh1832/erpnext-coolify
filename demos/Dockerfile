# Static-file image for the /demos multi-flow Oman e-invoice demo.
# Bakes the whole tree INTO the image (no bind mounts) so it deploys cleanly on
# Coolify, which does not reliably resolve relative compose bind-mount paths.
# The tree lives under /demos/ to match the public URL path — Traefik forwards
# the /demos prefix unchanged, so file paths line up with request paths.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/demos/
