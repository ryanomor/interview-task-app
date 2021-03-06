import React from 'react';

const Tasks = ({task, toggleOn, description, due, tasks, handleToggle, toggleHidden, isHidden, message, handleChange, deleteById, handleComplete, handleSubmit, handleFilter}) => {
    // Sorts tasks by due date. Closer deadlines go to the top!
    tasks.sort((task1, task2) => Date.parse(`${task1.dueDate.year}-${task1.dueDate.month}-${task1.dueDate.day}`) - Date.parse(`${task2.dueDate.year}-${task2.dueDate.month}-${task2.dueDate.day}`)); 
    const taskFilters = [
      'None',
      'Overdue',
      'Completed',
      'Due Today',
      'Due Tomorrow',
    ];

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

        <span className='filter'>
          <label>Filter By:</label>
          <select onChange={handleFilter}>
            {taskFilters.map((filter, key) => <option key={key}>{filter}</option>)}
          </select>
        </span>

        <span className='checkbox'>
          <label>Complete</label>
        </span>

        <ol>
          Tasks:
          {tasks.map((task, idx) => {
            let indicator;
            if (task.dueToday || task.dueTomorrow) {
              indicator = 'soon';
            } else if (task.isOverdue) {
              indicator = 'overdue';
            } else {
              indicator = 'fine';
            }

            return (
              <li key={idx} id={task.id}>
              <p className={indicator} onClick={toggleHidden}> {task.taskname} </p>
              <input className='checkbox' type='checkbox' checked={task.completed} onChange={handleComplete} />
              {isHidden[task.id] === true ? 
                '' : 
                <span>
                  <p> Description: {task.taskDescription} </p>
                  <p className={indicator}> Due: {`${task.dueDate.month}/${task.dueDate.day}/${task.dueDate.year}`} </p>
                  <button onClick={deleteById}>Remove Task</button>
                </span> 
              }
            </li>
          )})}
        </ol>
      </div>
    );
}

export default Tasks;
