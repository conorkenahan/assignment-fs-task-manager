import React, { useState, useEffect } from "react";
import { createTaskAPI, deleteTaskAPI, updateTaskAPI } from "./taskState";
import Task from "./Task/Task";
import SearchForm from "./SearchForm/SearchForm";
import NewTask from "./NewTask/NewTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    taskOwner: "",
    tags: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_LOCAL_HOST}/tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      await updateTaskAPI(taskId, updatedTask);
      await fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(taskId);
      await fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      await createTaskAPI(formData);
      await fetchTasks();
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        taskOwner: "",
        tags: "",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleSearch = (searchCriteria) => {
    const filtered = tasks.filter((task) => {
      const idMatch = !searchCriteria.id || task.id === searchCriteria.id;
      const statusMatch =
        !searchCriteria.status || task.status === searchCriteria.status;
      const priorityMatch =
        !searchCriteria.priority || task.priority === searchCriteria.priority;
      const dueDateMatch =
        (!searchCriteria.dueDateFrom ||
          new Date(task.dueDate) >= new Date(searchCriteria.dueDateFrom)) &&
        (!searchCriteria.dueDateTo ||
          new Date(task.dueDate) <= new Date(searchCriteria.dueDateTo));
      return statusMatch && priorityMatch && dueDateMatch && idMatch;
    });
    setFilteredTasks(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div className="header">
        <SearchForm onSearch={handleSearch} />
        <NewTask
          formData={formData}
          submitTask={submitTask}
          handleInputChange={handleInputChange}
        />
      </div>
      <div className="tasks">
        <h2>Tasks:</h2>
        <ul className="tasks-list">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTask={handleDeleteTask}
              updateTask={handleUpdateTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
