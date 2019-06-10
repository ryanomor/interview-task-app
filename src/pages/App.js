import React, { Component } from 'react';
import { setTasks, addTask, updateCompleted, removeTask, updateVotes } from '../actions/Actions';
import Tasks from '../components/Tasks';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      toggleOn: false,
      task: '',
      description: '',
      due: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    
    axios
      .get(`/tasks`)
      .then(res => {
        const { data, message } = res.data;
        dispatch(setTasks(data));
        console.log(message)
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

  // Submits a new task to datastore and server
  handleSubmit = e => {
    e.preventDefault();

    const { task, description, due } = this.state;
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
      .post('/', newTask)
      .then(res => {
        console.log(res.data.message);
        dispatch(addTask(newTask));
        this.setState({
          toggleOn: false,
          taskname: '',
          description: ''
        });
      })
      .catch(err => {
        console.log('Error:', err);
      });
  }

  // Patches a task's completed property by id
  handleComplete = e => {
    const taskId = e.target.parentElement.value;
    const { dispatch } = this.props;

    const updatedTask = {
      index: taskId,
      completed: e.target.checked
    }

    axios
      .post(`/completed/${taskId}`, updatedTask)
      .then(res => {
        console.log(res.data.message);
        dispatch(updateCompleted(updatedTask.index, updatedTask.completed));
        this.setState({});
      })
      .catch(err => console.log(err));
  }

  // Deletes a task by id
  deleteById = e => {
    e.preventDefault();
    const taskId = e.target.parentElement.value;
    const { dispatch } = this.props;

    const task = {
      index: taskId
    }

    axios
      .post(`/delete/${taskId}`, task)
      .then(res => {
        console.log(res.data.message);
        dispatch(removeTask(task.index));
        this.setState({});
      })
      .catch(err => console.log(err));
  }

  handleFilter = e => {
    console.log(e.target.value);
  }

  handleVote = e => {
    const vote = e.target.getAttribute('name').split('-'); // creates an array with the story's index, aka its id, and either 'up' or 'down'
    const { dispatch } = this.props;
    
    let updateVote = {
      index: vote[0],
      newVote: vote[1]
    };

    axios
      .post('/votes', updateVote)
      .then(res => {
        console.log(res.data.message);
        dispatch(updateVotes(updateVote.index, updateVote.newVote));
        this.setState({});
      })
      .catch(err => console.log(err))
  }

  render() {
    const { task, toggleOn, description, due, errorMessage } = this.state;
    
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
