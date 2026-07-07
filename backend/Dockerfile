FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Explicitly set the port here too
ENV PORT=5000
EXPOSE 5000
# Use 'exec' form for faster startup
CMD ["node", "server.js"]