import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask, deleteTask, toggleComplete, setTasks, setSelectedTask } from '../redux/taskSlice';

function LeftSide() {
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.tasks.tasks);
    const selectedTask = useSelector((state) => state.tasks.selectedTask);

    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filter, setFilter] = useState('all');

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

        const updatedTask = tasks.find(task => task.id === id);
        if (updatedTask && selectedTask && selectedTask.id === updatedTask.id) {
            dispatch(setSelectedTask({ ...updatedTask, isEditing: selectedTask.isEditing }));
        }
    };

    const handleSelectTask = (task) => {
        navigate(`/task/${task.id}`);
        dispatch(setSelectedTask({ ...task, isEditing: false }));  
    };
    
    const handleEditTask = (task) => {
        navigate(`/edit/${task.id}`);
        dispatch(setSelectedTask({ ...task, isEditing: true }));
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed);

        return matchesSearch && matchesFilter;
    });

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

                <div className="search">
                    <label htmlFor="searchQuery">Search by title:</label>
                    <input
                        type="text"
                        id="searchQuery"
                        placeholder="Search tasks"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <ul>
                    {filteredTasks.map((task) => (
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
                    <select id="filterOptions" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </div>  
            </section>
        </div>
    );
}

export default LeftSide;
