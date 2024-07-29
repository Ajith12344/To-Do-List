import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TaskItem = ({ task, onUpdate, onDelete, onToggleComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    onToggleComplete(task._id);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  const handleUpdate = () => {
    const newTitle = prompt("Update Task Title:", task.title);
    const newDescription = prompt("Update Task Description:", task.description);
    if (newTitle && newDescription) {
      onUpdate({ ...task, title: newTitle, description: newDescription });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon 
            icon={task.completed ? 'check-circle' : 'times-circle'} 
            className={`text-2xl ${task.completed ? 'text-green-500' : 'text-red-500'}`} 
          />
          <span 
            className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`} 
            onClick={handleToggle}
          >
            {task.title}
          </span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleToggle} 
            className={`px-4 py-2 rounded-md ${task.completed ? 'bg-gray-500' : 'bg-green-500'} text-white`}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button 
            onClick={handleUpdate} 
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
      <button 
        className="mt-2 text-blue-500 hover:text-blue-700" 
        onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      {isExpanded && (
        <div className="mt-2">
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-400">Last Updated: {new Date(task.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
