import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    status: "",
    priority: "",
    dueDateFrom: "",
    dueDateTo: "",
    id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedCriteria = { ...searchCriteria, [name]: value };

    setSearchCriteria(updatedCriteria);
    onSearch(updatedCriteria);
  };

  return (
    <form>
      <h2 className="header-form-title">Search Tasks</h2>
      <div className="header-form-contents">
        <div>
          <label htmlFor="id">Task ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={searchCriteria.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={searchCriteria.status}
            onChange={handleInputChange}
          >
            <option value="">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={searchCriteria.priority}
            onChange={handleInputChange}
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDateFrom">Due Date From:</label>
          <input
            type="date"
            id="dueDateFrom"
            name="dueDateFrom"
            value={searchCriteria.dueDateFrom}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="dueDateTo">Due Date To:</label>
          <input
            type="date"
            id="dueDateTo"
            name="dueDateTo"
            value={searchCriteria.dueDateTo}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
