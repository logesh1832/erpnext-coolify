# Tiny static-file image for the /mock-html demos.
# Bakes files INTO the image (no bind mounts) so it deploys cleanly on Coolify.
# Traefik routes  https://erp.plattr.co.in/mock-html*  here and passes the path
# through unchanged, so everything lives under /usr/share/nginx/html/mock-html/.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# original single-page Oman e-invoice demo  ->  /mock-html/
COPY index.html /usr/share/nginx/html/mock-html/index.html

# new multi-page hub mock  ->  /mock-html/hub-mock/
COPY hub-mock/ /usr/share/nginx/html/mock-html/hub-mock/
