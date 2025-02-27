import './TaskNavbar.css';

function TaskNavbar({ onAddTask }) {
  return (
    <div className="nav-task-main">
      <h1>Yash Task</h1>
      {/* <button onClick={onAddTask}>Add Task</button> */}
      <div>
        <p>Profile</p>
      </div>
    </div>
  );
}

export default TaskNavbar;
