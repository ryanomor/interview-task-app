import React, { Component } from 'react';
import { setTasks, addTask, updateCompleted, removeTask } from '../actions/Actions';
import Tasks from '../components/Tasks';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      due: '',
      task: '',
      isHidden: {},
      description: '',
      toggleOn: false,
      errorMessage: ''
    };
  }

  componentDidMount() {
    const { isHidden } = this.state;
    const { dispatch } = this.props;
    
    axios
      .get(`/tasks`)
      .then(res => {
        const { data, message } = res.data;
        dispatch(setTasks(data));
        console.log(message)
        data.forEach(task => {
          isHidden[task.id] = true
        });
        this.setState({isHidden});
      })
      .catch(err => {
        console.log(err);
      });

  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: ''
    });
  }

  handleToggle = () => {
    let { toggleOn } = this.state;

    if (!toggleOn) {
      this.setState({
        toggleOn: true,
      });
    }
  }

  toggleHidden = e => {
    const { isHidden } = this.state;
    const taskId = e.target.parentElement.id;
    isHidden[taskId] = !isHidden[taskId];

    this.setState({ isHidden });
  }

  // Submits a new task to datastore and server
  handleSubmit = e => {
    e.preventDefault();

    const { isHidden, task, description, due } = this.state;
    const { dispatch } = this.props;

    if (!task) {
      this.setState({
        errorMessage: 'Please enter a task'
      });
      return;
    } else if (!description) {
      this.setState({
        errorMessage: 'Please enter a description'
      });
      return;
    } else if (!due) {
      this.setState({
        errorMessage: 'Please enter a due date'
      });
      return;
    }

    const date = due.split('-');

    const newTask = {
      taskname: task,
      taskDescription: description,
      dueDate: { month: date[1], day: date[2], year: date[0] },
      completed: false
    };

    axios
      .post('/tasks', newTask)
      .then(res => {
        const { task, message } = res.data;
        console.log(message);
        dispatch(addTask(task));
        isHidden[task.id] = true;
        this.setState({
          due: '',
          task: '',
          description: '',
          toggleOn: false,
          isHidden: isHidden
        });
      })
      .catch(err => {
        console.log('Error:', err);
      });
  }

  // Sends a patch request for a Task by id
  handleComplete = e => {
    e.stopPropagation();
    const taskId = Number(e.target.parentElement.id);
    const { dispatch } = this.props;

    const updatedTask = {
      id: taskId,
      completed: e.target.checked
    };

    axios
      .patch(`/tasks/${taskId}`, updatedTask)
      .then(res => {
        console.log(res.data.message);
        dispatch(updateCompleted(updatedTask.id, updatedTask.completed));
        this.setState({});
      })
      .catch(err => {
        console.log(err)
      });
  }

  // Sends a Delete request
  deleteById = e => {
    e.preventDefault();
    const taskId = e.target.parentElement.id;
    const { dispatch } = this.props;

    const task = {
      id: taskId
    }

    axios
      .delete(`/tasks/${taskId}`, task)
      .then(res => {
        console.log(res.data.message);
        dispatch(removeTask(task.id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Sends a get request to filter Tasks
  handleFilter = e => {
    let filter;

    switch (e.target.value) {
      case 'Completed': {
        filter = 'completed';
        break;
      }
      case 'Overdue': {
        filter = 'isOverdue';
        break;
      }
      case 'Due Today': {
        filter = 'dueToday';
        break;
      }
      case 'Due Tomorrow': {
        filter = 'dueTomorrow';
        break;
      }
      default: {
        filter = '';
      }
    };

    const { dispatch } = this.props;

    axios
      .get(`/tasks?filter[where][filter]=${filter}`)
      .then(res => {
        const { data, message } = res.data;
        console.log(message);
        dispatch(setTasks(data));
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { task, toggleOn, isHidden, description, due, errorMessage } = this.state;
    
    return (
      <div className='App'>
        <Tasks 
          task={task} 
          description={description} 
          due={due}
          toggleOn={toggleOn} 
          message={errorMessage}
          tasks={this.props.tasks} 
          handleToggle={this.handleToggle}
          isHidden={isHidden}
          toggleHidden={this.toggleHidden}
          handleChange={this.handleChange}
          deleteById={this.deleteById}
          handleComplete={this.handleComplete}
          handleSubmit={this.handleSubmit}
          handleFilter={this.handleFilter}
        />
      </div>
    );
  }
}

export default connect(state => state)(App);
