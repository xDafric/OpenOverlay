## ---------- Build ------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runtime -----------
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# DB migrations
COPY drizzle.config.ts /app/
COPY drizzle /app/drizzle

EXPOSE 3000
CMD ["npm", "start"]