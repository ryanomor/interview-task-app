FROM mhart/alpine-node:8

# Set the working directory to /app/backend
WORKDIR /app/backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json ./

# Install any needed packages
RUN npm install 

# Copy the current directory contents into the container at /app/backend
COPY . /app/backend

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Run back-end server when the container launches
CMD ["npm", "start"]
