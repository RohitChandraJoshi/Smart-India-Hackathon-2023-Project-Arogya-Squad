// TaskManagerComponent.js

import React, { useState } from 'react';
import './TaskManagerComponent.css';

const TaskManagerComponent = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();

    // Add the new task to the task list
    setTaskList([...taskList, { id: Date.now(), title: taskTitle }]);
    
    // Clear the task title input
    setTaskTitle('');
  };

  const handleRemoveTask = (taskId) => {
    // Remove the task with the specified id from the task list
    setTaskList(taskList.filter(task => task.id !== taskId));
  };

  return (
    <div className="task-manager">
      <h2>Manage Your Tasks Efficiently</h2>
      <form onSubmit={handleAddTask}>
        <label>
          Task Title:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
      {taskList.length > 0 && (
        <div className="task-list">
          <h3>Your Tasks:</h3>
          <ul>
            {taskList.map((task) => (
              <li key={task.id}>
                {task.title}
                <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskManagerComponent;
