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
        index: id,
        completed: completed
    }),

    removeTask: (id) => ({
        type: "REMOVE_TASK",
        index: id
    }),

    updateVotes: (id, vote) => ({
        type: "UPDATE_VOTES",
        index: id,
        newVote: vote
    })
};
