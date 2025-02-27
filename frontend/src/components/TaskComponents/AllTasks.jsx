import { useState, useEffect } from 'react';
import TaskBoard from './Tasks/TaskBoard';
import TaskNavbar from './TaskNavbar/TaskNavbar';
import './AllTasks.css';
import { DragDropContext } from '@hello-pangea/dnd'; // Use @hello-pangea/dnd instead of react-beautiful-dnd
import axios from 'axios';

function AllTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/tasks/${draggableId}/status`, { status: destination.droppableId });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const addTask = async () => {
    const name = prompt('Enter task name:');
    const description = prompt('Enter task description:');
    const status = prompt('Enter task status (Pending, Completed, or Done):');

    if (name && description && status) {
      try {
        await axios.post('http://localhost:5000/api/tasks', { name, description, status });
        fetchTasks(); // Refresh tasks after adding
      } catch (error) {
        console.error('Error adding task:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main-div-alltasks">
        <TaskNavbar onAddTask={addTask} />
        <TaskBoard tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </DragDropContext>
  );
}

export default AllTasks;
