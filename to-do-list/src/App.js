import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
// import './styles.css';
import './icons';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === updatedTask._id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = (id) => {
    const task = tasks.find(task => task._id === id);
    updateTask({ ...task, completed: !task.completed });
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Todo List</h1>
      <div className="w-full max-w-lg px-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TaskForm onSave={addTask} />
        <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} onToggleComplete={toggleComplete} />
      </div>
    </div>
  );
};

export default App;
