const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const tasksFilePath = path.join(__dirname, "../server/_mockDB/tasks.json");

// Read tasks from JSON file
const readTasks = () => {
  const data = fs.readFileSync(tasksFilePath);
  return JSON.parse(data);
};

// Write tasks to JSON file
const writeTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// Get all tasks
router.get("/", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// Get a single task by ID
router.get("/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Create a new task
router.post("/", (req, res) => {
  const newTask = req.body;
  const tasks = readTasks();
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// Update a task by ID
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks[index] = updatedTask;
    writeTasks(tasks);
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Delete a task by ID
router.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  let tasks = readTasks();
  tasks = tasks.filter((t) => t.id !== taskId);
  writeTasks(tasks);
  res.status(204).end();
});

module.exports = router;
