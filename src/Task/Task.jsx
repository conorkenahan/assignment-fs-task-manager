import React, { useState } from "react";

const Task = ({ task, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [showMore, setShowMore] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    setTagsInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const updatedTaskWithTags = { ...editedTask, tags: tagsArray };

    try {
      await updateTask(task.id, updatedTaskWithTags);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      setEditedTask(task);
      setTagsInput(task.tags ? task.tags.join(", ") : "");
    }
  };

  if (isEditing) {
    return (
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="task-form-item">
          <p>Title:</p>
          <input
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
            required
          />
        </div>
        <div className="task-form-item">
          <p>Due Date:</p>
          <input
            name="dueDate"
            type="date"
            value={editedTask.dueDate}
            onChange={handleEditChange}
            required
          />
        </div>
        <div className="task-form-item">
          <p>Priority:</p>
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleEditChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="task-form-item">
          <p>Owner:</p>
          <input
            name="owner"
            value={editedTask.owner}
            onChange={handleEditChange}
          />
        </div>
        <div className="task-form-item">
          <p>Description:</p>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
          />
        </div>
        <div className="task-form-item">
          <p>Tags:</p>
          <input name="tags" value={tagsInput} onChange={handleTagsChange} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={toggleEdit}>
          Cancel
        </button>
      </form>
    );
  }

  return (
    <li className="task">
      <div
        className="task-content"
        onClick={() => setShowMore((prev) => !prev)}
      >
        <h3>
          {task.id} - {task.title}
        </h3>
        <p className="task-description">{task.description}</p>
        <p>
          <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        {showMore && (
          <div>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Owner:</strong> {task.taskOwner}
            </p>
            <p>
              <strong>Tags:</strong> {task.tags ? task.tags.join(", ") : ""}
            </p>
          </div>
        )}
      </div>
      <button onClick={toggleEdit}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default Task;
