'use strict';

module.exports = function(app) {
  var router = app.loopback.Router();
  
  let tasks = [
    {
      id: 1,
      taskname: 'Do chores', 
      taskDescription: 'Take out trash, buy groceries, do laundry', 
      dueDate: { month: new Date().getMonth() + 1, day: new Date().getDate(), year: new Date().getFullYear() },
      completed: false,
    },
    {
      id: 2,
      taskname: 'Technical Interview', 
      taskDescription: 'Technical interview with Justin Hale\'s team', 
      dueDate: { month: new Date(2019, 5, 12).getMonth() + 1, day: new Date(2019, 5, 12).getDate(), year: new Date(2019, 5, 12).getFullYear() },
      completed: false,
    }
  ];

  /**
   * Find Task(s) by filter.
   */
  function filterBy(filter) {
    let filteredTasks = tasks.filter(task => task[filter] === true); 
    let message;
    
    switch (filter) {
      case 'isOverdue': {
        message = 'Filtered overdue Tasks';
        break;
      }
      case 'completed': {
        message = 'Filtered completed Tasks';
        break;
      }
      case 'dueToday': {
        message = 'Filtered Tasks due today';
        break;
      }
      case 'dueTomorrow': {
        message = 'Filtered Tasks due tomorrow';
        break;
      }
      default:
        filteredTasks = tasks;
        message = 'No Tasks filtered';
    }

    return {
      data: filteredTasks, 
      message: message
    }
  };

  /**
   * Returns a list of Tasks that the user has submitted.
   */
  router.get('/tasks', (req, res) => {
    let data;
    
    if (req.query.filter) {
      const { filter } = req.query.filter.where;
      data = filterBy(filter);
    } else {
      const today = new Date();
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  
      // Updates each Task's properties to reflect their relation to today & tomorrow
      tasks.forEach(task => {
        task.isOverdue = Date.parse(`${task.dueDate.year}-${task.dueDate.month}-${task.dueDate.day}`) < Date.parse(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
        task.dueToday = task.dueDate.year == today.getFullYear() && task.dueDate.month == today.getMonth() + 1 && task.dueDate.day == today.getDate();
        task.dueTomorrow = task.dueDate.year == tomorrow.getFullYear() && task.dueDate.month == tomorrow.getMonth() + 1 && task.dueDate.day == tomorrow.getDate();
      });

      data = {
        data: tasks, 
        message: 'Tasks sent!'
      };
    }

    res
      .status(200)
      .json(data);
  });

  /**
   * Saves a Task that a user submitted.
   */
  router.post('/tasks', (req, res) => {
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const newTask = { ...req.body };
    newTask.id = tasks.length + 1;
    newTask.isOverdue = Date.parse(`${newTask.dueDate.year}-${newTask.dueDate.month}-${newTask.dueDate.day}`) < Date.parse(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
    newTask.dueToday = newTask.dueDate.year == today.getFullYear() && newTask.dueDate.month == today.getMonth() + 1 && newTask.dueDate.day == today.getDate();
    newTask.dueTomorrow = newTask.dueDate.year == tomorrow.getFullYear() && newTask.dueDate.month == tomorrow.getMonth() + 1 && newTask.dueDate.day == tomorrow.getDate();

    tasks = [newTask, ...tasks];

    res
      .status(200)
      .json({
        task: newTask,
        message: 'New Task added!'
      });
  });

  /**
   * Find Task by id.
   */
  router.get('/tasks/:id', (req, res) => {
    task = tasks.filter(task => task.id === req.body.id);
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
  router.delete('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    
    res
      .status(200)
      .json({
        message: 'Task deleted!'
      });
  });

  /**
   * Patch Task by id
   */
  router.patch('/tasks/:id', (req, res) => {
    const { id, completed } = req.body;

    const targetTask = tasks.find(task => task.id === id);
    targetTask.completed = completed;

    res
      .status(200)
      .json({
        message: 'Task updated!'
      });
  });

  app.use(router);
}
