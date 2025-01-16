import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        setTasks(state, action) {
            return action.payload;
        },
        addTask(state, action) {
            state.push(action.payload);
        },
        deleteTask(state, action) {
            return state.filter(task => task.id !== action.payload);
        },
        toggleComplete(state, action) {
            const task = state.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        }
    }
});

export const { setTasks, addTask, deleteTask, toggleComplete } = taskSlice.actions;

export default taskSlice.reducer;