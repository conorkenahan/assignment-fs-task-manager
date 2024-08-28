import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    owner: "",
  });

  useEffect(() => {
    console.log("App component has mounted");
    getTasks();
  }, []);

  const submitTask = (e) => {
    e.preventDefault();
    // const { season, timeOfDay, reviewBody } = e.target;
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/tasks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        placeid: this.props.placeid,
        placename: this.props.placename,
        season: season.value,
        timeofday: timeOfDay.value,
        reviewbody: reviewBody.value,
        rating: this.state.rating,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.getReviews();
        this.setState({
          rating: 0,
          season: "Spring",
          timeOfDay: "Morning",
          reviewText: "Leave review here",
        });
        reviewBody.value = "";
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  const getTasks = () => {
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/tasks`)
      .then((res) => res.json())
      .then((tasks) => {
        setTasks(tasks);
        // console.log("tasks!", tasks);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => [...prevTasks, { ...formData, id: Date.now() }]);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      owner: "",
    });
  };

  return (
    <div className="">
      <h1 className="">Task Manager</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <label htmlFor="title" className="">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className=""
          />
        </div>
        <div className="">
          <label htmlFor="description" className="">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className=""
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="">
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            className=""
          />
        </div>
        <div className="">
          <label htmlFor="priority" className="">
            Priority:
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className=""
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="owner" className="">
            Task Owner:
          </label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleInputChange}
            className=""
          />
        </div>
        <button type="submit" className="">
          Add Task
        </button>
      </form>
      <div>
        <h2 className="">Tasks:</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="">
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Owner: {task.owner}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
