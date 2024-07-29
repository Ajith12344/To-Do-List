import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete, onToggleComplete }) => {
  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
          onToggleComplete={onToggleComplete} 
        />
      ))}
    </ul>
  );
};

export default TaskList;
