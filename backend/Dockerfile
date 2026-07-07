FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Force the port to 80 so Azure's default Load Balancer can talk to it
ENV PORT=80
EXPOSE 80
CMD ["node", "server.js"]