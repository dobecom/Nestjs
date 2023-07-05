FROM node:18.16-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build:scheduler
FROM node:18.16-alpine
WORKDIR /usr/src/app
ARG STAGE
COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/node_modules node_modules
COPY --from=builder /usr/src/app/.env.$STAGE .env
CMD ["node", "dist/apps/scheduler/main.js"]