export const tasks = (state = [], action) => {
    switch (action.type) {
        case "SET_TASKS": {
            return action.tasks;
        }
        case "ADD_TASK": {
            return [action.task, ...state];
        }
        case "REMOVE_TASK": {
            state = state.filter(task => task.id !== action.id);
            return state;
        }
        case "UPDATE_COMPLETED": {
            const task = state.find(task => task.id === action.id);
            task.completed = action.completed;
            return state;
        }
        default:
            return state;
    }
}
