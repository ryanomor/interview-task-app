FROM mhart/alpine-node:6.9.2

# Set the working directory to /app/backend
WORKDIR /app/backend

# Copy the current directory contents into the container at /app/backend
COPY . /app/backend

# Install any needed packages
RUN npm install 

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Run back-end server when the container launches
CMD ["node", ".”]
