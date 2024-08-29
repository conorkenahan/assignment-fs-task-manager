const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

const tasksFilePath = path.join(__dirname, "../server/_mockDB/tasks.json");

async function readTasks() {
  try {
    const data = await fs.readFile(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tasks file:", error);
    return [];
  }
}

// Write tasks to file
async function writeTasks(tasks) {
  try {
    await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error writing tasks file:", error);
  }
}

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// New task
app.post("/tasks", async (req, res) => {
  try {
    const tasks = await readTasks();
    // below is not best option for creating new task IDs - IDs can be recreated
    const maxId = tasks.reduce((max, task) => {
      const taskId = Number(task.id);
      return taskId > max ? taskId : max;
    }, 0);
    const { title, description, dueDate, taskOwner, priority, tags } = req.body;
    const newTask = {
      id: String(maxId + 1),
      title: title || null,
      description: description || null,
      dueDate: dueDate || null,
      status: "To Do",
      taskOwner: taskOwner || null,
      creationTime: new Date(Date.now()).toISOString(),
      priority: priority || null,
      tags: tags ? tags.split(" ").filter((tag) => tag.trim() !== "") : null,
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIdToDelete = req.params.id;

    const updatedTasks = tasks.filter((task) => task.id !== taskIdToDelete);

    await writeTasks(updatedTasks);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update task
app.put("/tasks/:id", async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === req.params.id);
    const updatedTask = { ...tasks[taskIndex], ...req.body };
    tasks[taskIndex] = updatedTask;

    await writeTasks(tasks);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
