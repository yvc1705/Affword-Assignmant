import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import './Column.css';

function Column({ status, tasks, deleteTask }) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          className={`column ${status.toLowerCase()}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{status}</h2>
          <div className="task-list">
            {tasks.map((task, index) => (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Column;
