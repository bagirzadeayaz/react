import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../redux/taskSlice';

function RightSide() {
    const selectedTask = useSelector((state) => state.tasks.selectedTask);
    const dispatch = useDispatch();

    const [newTitle, setNewTitle] = useState(selectedTask ? selectedTask.title : '');
    const [newDescription, setNewDescription] = useState(selectedTask ? selectedTask.description : '');

    const [initialTitle, setInitialTitle] = useState(selectedTask ? selectedTask.title : '');
    const [initialDescription, setInitialDescription] = useState(selectedTask ? selectedTask.description : '');
    
    useEffect(() => {
        if (selectedTask) {
            setNewTitle(selectedTask.title || ''); 
            setNewDescription(selectedTask.description || '');  

            setInitialTitle(selectedTask.title);
            setInitialDescription(selectedTask.description);
        }
    }, [selectedTask]);

    const handleUpdateTask = (e) => {
        e.preventDefault();
        if (newTitle.trim() && selectedTask) {
            const updatedTask = {
                ...selectedTask,
                title: newTitle,
                description: newDescription,
                isEditing: false  
            };
            dispatch(updateTask(updatedTask));  
        }
    };

    const handleCancelEdit = () => {
        setNewTitle(initialTitle);
        setNewDescription(initialDescription);
        dispatch(updateTask({ ...selectedTask, isEditing: false }));  
    };

    return (
        <div className="right-container">
            <h2>Selected Task</h2>
            {selectedTask ? (
                !selectedTask.isEditing ? (
                    <div>
                        <h3>{selectedTask.title}</h3>
                        <p>{selectedTask.description}</p>
                        <p>Created At: {new Date(selectedTask.createdAt).toLocaleString()}</p>
                        <p>Status: {selectedTask.completed ? 'Completed' : 'Incomplete'}</p>
                    </div>
                ) : (
                    <form onSubmit={handleUpdateTask}>
                        <fieldset>
                            <legend>Edit Title</legend>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Edit Description</legend>
                            <input
                                type="text"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </fieldset>

                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    </form>
                )
            ) : (
                <p>No task selected</p>
            )}
        </div>
    );
}


export default RightSide;
