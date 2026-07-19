# Base image
FROM node:18

# Create app directory
WORKDIR /usr/demasy/src/app

# Copy project files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose port (documentation only; actual binding is set in docker-compose.yml)
ARG DEMASY_SERVER_PORT=3002
EXPOSE ${DEMASY_SERVER_PORT}

# Start the app
CMD ["npm", "start"]