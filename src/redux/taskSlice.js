import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        selectedTask: null
    },
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload;
        },
        addTask(state, action) {
            state.tasks.push(action.payload);
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        toggleComplete(state, action) {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        setSelectedTask(state, action) {
            state.selectedTask = action.payload;
        },
        updateTask(state, action) {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        }
    }
});

export const { setTasks, addTask, deleteTask, toggleComplete, setSelectedTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;