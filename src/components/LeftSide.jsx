import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleComplete, setTasks, setSelectedTask } from '../redux/taskSlice';

function LeftSide() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            const tasksToLoad = parsedTasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                createdAt: task.createdAt,
                completed: task.completed
            }));
            dispatch(setTasks(tasksToLoad));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) return;

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            description: taskDescription,
            createdAt: Date.now(),
            completed: false
        };
        
        dispatch(addTask(newTask));
        setTaskTitle('');
        setTaskDescription('');
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleComplete(id));
    };

    const handleSelectTask = (task) => {
        dispatch(setSelectedTask({ ...task, isEditing: false }));  
    };
    
    const handleEditTask = (task) => {
        dispatch(setSelectedTask({ ...task, isEditing: true }));
    };

    return (
        <div className="container">
            <header>
                <h1>Tasks List</h1>
            </header>

            <section className="task-add">
                <h2>Add Task</h2>
                <form id="addTaskForm" onSubmit={handleAddTask}>
                    <fieldset>
                        <legend>Name</legend>
                        <input
                            type="text"
                            id="taskTitle"
                            placeholder="Name of task"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Description</legend>
                        <input
                            id="taskDescription"
                            placeholder="Description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </fieldset>

                    <button>Add Task</button>
                </form>
            </section>

            <section className="task-list">
                <h2>Your tasks</h2>
                <ul>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`task-item ${task.completed ? 'completed' : 'incomplete'}`}
                        >
                            <div>
                                <h3 onClick={() => handleSelectTask(task)}>{task.title}</h3>
                            </div>
                            <div>
                                <button onClick={() => handleToggleComplete(task.id)} className="toggle-complete">
                                    {task.completed ? 'Complete' : 'Incomplete'}
                                </button>
                                <button onClick={() => handleEditTask(task)}>Edit</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="filter">
                    <label htmlFor="filterOptions">Filter tasks:</label>
                    <select id="filterOptions">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </div>

                <div className="sort">
                    <label htmlFor="sortOptions">Sort tasks:&nbsp;</label>
                    <select id="sortOptions">
                        <option value="not-sorted">Not sorted</option>
                        <option value="date">Sort by Date</option>
                        <option value="name">Sort by Name</option>
                    </select>
                </div>
            </section>
        </div>
    );
}

export default LeftSide;
