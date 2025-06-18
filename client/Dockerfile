FROM node:22-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL $VITE_BACKEND_URL
RUN pnpm i
RUN pnpm build

FROM nginx:1.28.0-alpine-slim AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
