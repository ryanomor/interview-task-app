const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + 'public'));

let tasks = [
  {
    taskname: 'Do chores', 
    taskDescription: 'Take out trash, buy groceries, do laundry', 
    dueDate: { month: new Date().getMonth() + 1, day: new Date().getDate(), year: new Date().getFullYear() },
    completed: false,
  },
  {
    taskname: 'Technical Interview', 
    taskDescription: 'Technical interview with Justin Hale\'s team', 
    dueDate: { month: new Date(2019, 5, 12).getMonth() + 1, day: new Date(2019, 5, 12).getDate(), year: new Date(2019, 5, 12).getFullYear() },
    completed: false,
  }
];

/**
 * Returns a list of Tasks that the user has submitted.
 */
app.get('/tasks', (req, res) => {
  res
    .status(200)
    .json({
      data: tasks, 
      message: 'All tasks sent!'
    });
});

/**
 * Saves a Task that a user submitted.
 */
app.post('/', (req, res) => {
  const newTask = { ...req.body };

  tasks = [newTask, ...tasks];

  res
    .status(200)
    .json({
      message: 'New task added!'
    });
});

/**
 * Find Task by id.
 */
app.get('/task/:id', (req, res) => {
  task = tasks.filter((task, index) => index === req.body.index);
  res
    .status(200)
    .json({
      data: task,
      message: 'Task found!'
    });
});

/**
 * Delete Task by id.
 */
app.post('/delete/:id', (req, res) => {
  tasks = tasks.filter((task, index) => index !== req.body.index);
  res
    .status(200)
    .json({
      message: 'Task deleted!'
    });
});

/**
 * Patch Task by id
 */
app.post('/completed/:id', (req, res) => {
  const { index, completed } = req.body;

  tasks[index].completed = completed;

  res
    .status(200)
    .json({
      message: 'Task updated!'
    });
});


/**
 * Updates specific story's votes
 */
app.post('/votes', (req, res) => {
  const { index, newVote } = req.body;

  if (newVote == 'up') {
    tasks[index].votes++;
  } else {
    tasks[index].votes--;
  }

  res
    .status(200)
    .json({
      message: 'Votes updated!'
    });
});

// use port 3001 unless there exists a preconfigured port
const port = process.env.PORT || 3001

app.listen(port, () => console.log(`API running on port ${port}`));
