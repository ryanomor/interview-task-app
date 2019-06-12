FROM mhart/alpine-node:6.9.2

# Set the working directory to /app/client
WORKDIR /app/client

# Copy the current directory contents into the container at /app/client
COPY . /app/client

# Install any needed packages
RUN npm install 

# Make port 3001 available to the world outside this container
EXPOSE 3000

# Run back-end server when the container launches
CMD ["npm", "start”]
