# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV PORT=5000
EXPOSE 5000
# Change to the 'shell' form to ensure it runs correctly on Linux
CMD node server.js