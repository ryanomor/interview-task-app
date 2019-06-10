export const tasks = (state = [], action) => {
    switch (action.type) {
        case "SET_TASKS": {
            return action.tasks;
        }
        case "ADD_TASK": {
            return [action.task, ...state];
        }
        case "REMOVE_TASK": {
            state = state.filter((task, id) => id !== action.index);
            return state;
        }
        case "UPDATE_COMPLETED": {
            const task = state[action.index];
            task.completed = action.completed;
            return state;
        }
        case "UPDATE_VOTES": {
            let updatedStory = state[action.index];
            if (action.newVote === 'up') {
                updatedStory.votes++;
            } else {
                updatedStory.votes--;
            }
            return state;
        }
        default:
            return state;
    }
}
