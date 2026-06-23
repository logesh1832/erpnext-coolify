# Static-file image for the /demos multi-flow Oman e-invoice demo.
# Bakes the whole tree INTO the image (no bind mounts) so it deploys cleanly on
# Coolify, which does not reliably resolve relative compose bind-mount paths.
# Coolify's Traefik STRIPS the /demos prefix before forwarding, so the tree is
# copied to the nginx ROOT (this also overwrites the stock "Welcome to nginx!"
# index.html). The nginx.conf adds a defensive rewrite so it still works if a
# deployment forwards the /demos prefix unchanged.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/
