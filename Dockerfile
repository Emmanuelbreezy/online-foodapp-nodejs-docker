# Use the Node 20 Alpine image as base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Define an argument for the environment (default to development)
ARG NODE_ENV

RUN npm install -g typescript

# Install dependencies based on the environment
RUN npm install

# Copy the rest of the application code to the working directory
COPY . ./


RUN npm run build
# If the environment is production, build only the production-ready files
# RUN if [ "$NODE_ENV" = "production" ]; then \
#         npm run build; \
#         mv dist /tmp/dist && \
#         rm -rf * && \
#         mv /tmp/dist . || true; \
#     fi

# Set the default command to run the application
CMD ["node", "dist/index.js"]