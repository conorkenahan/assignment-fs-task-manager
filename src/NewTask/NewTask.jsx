import React from "react";

const NewTask = ({ formData, submitTask, handleInputChange }) => {
  return (
    <div className="header-form new-task">
      <h2 className="header-form-title">New Task</h2>
      <form className="header-form-contents" onSubmit={submitTask}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="taskOwner">Task Owner:</label>
          <input
            type="text"
            id="taskOwner"
            name="taskOwner"
            value={formData.taskOwner}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="tag-input">
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default NewTask;
