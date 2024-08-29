import { atom, selector } from "recoil";

export const tasksState = atom({
  key: "tasksState",
  default: [],
});

export const loadTasks = selector({
  key: "loadTasks",
  get: async () => {
    const response = await fetch(`${process.env.REACT_APP_LOCAL_HOST}/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  },
});

export const createTaskAPI = async (newTask) => {
  const response = await fetch(`${process.env.REACT_APP_LOCAL_HOST}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

export const deleteTaskAPI = async (taskId) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST}/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};

export const updateTaskAPI = async (taskId, updatedTask) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};
