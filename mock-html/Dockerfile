# Tiny static-file image for the /mock-html demos.
# Bakes files INTO the image (no bind mounts) so it deploys cleanly on Coolify.
# Coolify's path-domain adds a Traefik StripPrefix(/mock-html) middleware, so
# nginx receives the path WITHOUT the /mock-html prefix -> serve at web root.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# original single-page Oman e-invoice demo  ->  /mock-html/
COPY index.html /usr/share/nginx/html/index.html

# new multi-page hub mock  ->  /mock-html/hub-mock/
COPY hub-mock/ /usr/share/nginx/html/hub-mock/
