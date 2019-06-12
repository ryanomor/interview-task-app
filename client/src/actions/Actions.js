// Actions for reducer

module.exports = {
    addTask: task => ({
        type: "ADD_TASK",
        task
    }),

    setTasks: tasks => ({
        type: "SET_TASKS",
        tasks
    }),

    updateCompleted: (id, completed) => ({
        type: "UPDATE_COMPLETED",
        id: id,
        completed: completed
    }),

    removeTask: (id) => ({
        type: "REMOVE_TASK",
        id: id
    }),
};
