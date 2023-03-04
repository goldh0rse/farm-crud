# ==== CONFIGURATION ====
FROM node:19

# Set the working directory to /app inside the container
WORKDIR /app

# Copy the app files
COPY . .

# ==== BUILD ====
# Install dependencies
RUN npm ci

# Build the app
RUN npm run build

# ==== RUN ====
# Set the env to "production"
ENV NODE_ENV production
ENV PORT 3005
# ENV HOST http://docker.for.mac.localhost


# expose the port on which the app will be running
EXPOSE 3005

# Start the container
CMD ["npm", "run", "start"]
# CMD ["node", "server.js"]