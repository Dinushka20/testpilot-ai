# backend/Dockerfile
# Use a lightweight Node.js alpine image for a smaller footprint
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies FIRST (this caches the npm install step)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the backend source code
COPY . .

# Expose the port your Express app runs on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]