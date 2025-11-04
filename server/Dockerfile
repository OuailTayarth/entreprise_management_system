# syntax=docker/dockerfile:1 
# Stage 1: build
FROM node:22-alpine AS build    
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: runtime
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package*.json ./
RUN npm ci --omit=dev
USER node
EXPOSE 8000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]












