

function LeftSide() {
    return (
        <div class="container">
        <header>
            <h1>Tasks List</h1>
        </header>

        
        <section class="task-add">
            <h2>Add Task</h2>

            <form id="addTaskForm">
                <fieldset>
                    <legend>Name</legend>
                    <input type="text" id="taskTitle" placeholder="Name of task"/>
                </fieldset>

                <fieldset>
                    <legend>Description</legend>
                    <input id="taskDescription" placeholder="Description"/>
                </fieldset>

                <button>Add Task</button>
            </form>
        </section>

        <section class="task-list">
            <h2>Your tasks</h2>

            <div class="filter">
                <label for="filterOptions">Filter tasks:</label>
                <select id="filterOptions">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            <div class="sort">
                <label for="sortOptions">Sort tasks:</label>
                <select id="sortOptions">
                    <option value="not-sorted">Not sorted</option>
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            <ul id="taskList"></ul>
        </section>
        </div>
    )
}

export default LeftSide;