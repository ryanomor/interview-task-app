FROM mhart/alpine-node:8

# Set the working directory to /app/client
WORKDIR /app/client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json ./

# Install any needed packages
RUN npm install 

# Copy the current directory contents into the container at /app/client
COPY . /app/client

# Make port 3001 available to the world outside this container
EXPOSE 3000

# Run back-end server when the container launches
CMD ["npm", "start"]
