const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const fsSync = require('fs');

const router = express.Router();
const dataDir = path.join(__dirname, '../data');
const dataPath = path.join(dataDir, 'tasks.json');

// Check if data directory and file exist, if not, create them
const ensureDataFileExists = async () => {
  if (!fsSync.existsSync(dataDir)) {
    await fs.mkdir(dataDir); // Create the 'data' directory
  }
  if (!fsSync.existsSync(dataPath)) {
    await fs.writeFile(dataPath, JSON.stringify([], null, 2)); // Create 'tasks.json' with an empty array
  }
};

// Get all tasks
router.get('/', async (req, res) => {
  try {
    await ensureDataFileExists(); // Ensure file exists before reading
    const data = await fs.readFile(dataPath, 'utf8');
    const tasks = JSON.parse(data);
    res.json(tasks);
  } catch (error) {
    console.error('Error reading tasks:', error.message);
    res.status(500).json({ message: 'Error reading tasks', error: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name || !description || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await ensureDataFileExists(); // Ensure file exists before writing
    const data = await fs.readFile(dataPath, 'utf8');
    const tasks = JSON.parse(data);

    const newTask = { id: Date.now().toString(), name, description, status };
    tasks.push(newTask);

    await fs.writeFile(dataPath, JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await ensureDataFileExists(); // Ensure file exists before reading
    const data = await fs.readFile(dataPath, 'utf8');
    const tasks = JSON.parse(data);

    const updatedTasks = tasks.filter(task => task.id !== id);

    if (tasks.length === updatedTasks.length) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await fs.writeFile(dataPath, JSON.stringify(updatedTasks, null, 2));
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});


module.exports = router;
