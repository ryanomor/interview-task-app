import React from 'react';

const Tasks = ({task, toggleOn, description, due, tasks, handleToggle, message, handleChange, handleDelete, handleComplete, handleSubmit, handleVote}) => {
    tasks.sort((task1, task2) => Date.parse(task1.dueDate) - Date.parse(task2.dueDate)); // Sorts tasks by due date. Closer deadlines go to the top!
    
    return (
      <div>
        <h1> Submit a Task! </h1>
    
        {toggleOn ? (
          <form onSubmit={handleSubmit}>
            <input name='task' type='text' value={task} placeholder='Task' onChange={handleChange} />
            <input name='description' type='textarea' value={description} placeholder="Task description" onChange={handleChange} />
            <input name='due' type='date' value={due} onChange={handleChange} />
            <button onClick={handleSubmit}> Submit </button>
          </form>
        ) : (
            <button onClick={handleToggle}> Add Task </button>
        )}
        
        <p> { message ? message : '' } </p>

        <hr />

        <ol>
          {tasks.map((task, idx) => (
            <li key={idx} value={idx}>
              <p> Task: {task.taskname} </p>
              <p> Description: {task.taskDescription} </p>
              <p> Due: {new Date(task.dueDate).toLocaleDateString()} </p>
              <button onClick={handleDelete}>Remove Task</button>
              <input type='checkbox' checked={task.completed} onChange={handleComplete} />
            </li>
          ))}
        </ol>
      </div>
    );
}

export default Tasks;
