# Tiny static-file image for the /mock-html demo.
# Bakes the files INTO the image (no bind mounts) so it deploys cleanly on
# Coolify, which does not reliably resolve relative compose bind-mount paths.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
