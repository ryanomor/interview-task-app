# Quickstart
From the project's root, you can simply run `/bin/sh start.sh`, or for a more a more in depth start, refer to the next section.

Once done with the app, simply run `/bin/sh stop.sh` from the root of the project to remove the containters and images from your machine.

## (Not so quick) Start
* In your terminal, navigate to `backend` and execute `docker build -t express-server .`.
  Verify the container was successfully built by executeing `docker images`.

  Once done, navigate to `client` and execute `docker build -t app-frontend .`.
  Again, make sure the container was successfully built using `docker images`.

* Once both images have been built successfully, you can navigate to `localhost:3000` to view the app!
    * API documentation is at `localhost:3001/explorer`

### Now let's generate and run an instance of our images!
* In `backend` run the command: `docker run -d --name app-server -p 3001:3001 express-server`. The `-d` runs the command in detahced mode, `--name` flag gives the app a name and `-p` tag maps your machine's local port to the port exposed in the container.

Next in `client`, run: `docker run -d --link app-server:server --name task-app -p 3000:3000 app-frontend` where `--link` creates an alias that can be used to communicate with the backend.

# Problem Overview
To get started, install all dependencies by running `yarn` or `npm install`. As an optional bonus, feel free to write
some unit tests for the reducers and/or components. There is no single "right" way to implement this problem -- it is 
open ended as a feature. This portion of the interview is about examining how you write code/make architectural 
decisions.

## Frontend Description
The application you'll be building is a simple task management tool. The tool will allow an end user to create, manage and delete tasks using a web interface. The functionality that your project should contain is as follows:

* Submit a task providing a task name, description, and due date.
* Display a list of existing tasks.
* View the details of a specific task.
* Mark a task as completed.
* Remove a task.
* Filter list of tasks to tasks due tomorrow and / or today.
* Filter list of tasks to just those tasks which are overdue.
* Filter list of tasks to tasks marked as completed.
* As a user, I need a visual indication of which tasks are due tomorrow and /
or today as well as those tasks which are past due (2 different indications).

## Backend Description
The application will need to be able to store tasks. For this exercise in-memory storage is acceptable. 
The user interface can be created without style / theming. Style / Theming will score you bonus points, but is not the goal of this exercise.
The application has no need for authentication, authorization or any type of user profile or tracking. It is assumed that the application is used by a single user.
The use of Docker / Docker Compose to run the application is encouraged.

### Existing folder structure
* `public` -- you shouldn't need to modify anything in here
* `src`
    * `actions` -- I'd suggest placing action creators/constants in this directory
    * `components` -- presentational components can go here
    * `pages` -- actual pages of the application (link submission/list of links) _note: you're also free to keep
    everything on the same page in order to avoid using `react-router`_
    * `reducers` -- Redux reducers go in here
    * `index.js` -- entry point for the web app. Everything should already be setup here.
    * `server.js` -- fill in anything that you need to create a simple express based API 
    
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). For 
information about using `Create React App`, click the previous link.
