import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/health`);
      setMessage(res.data.message);
      fetchTasks();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Backend not connected");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/tasks`, { title: newTask });
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
    setLoading(false);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>🚀 DevOps MERN Application</h1>
        <p className="status">
          Backend Status: <span className="badge">{message}</span>
        </p>
      </header>

      <main className="container">
        <div className="task-section">
          <h2>📝 Task Manager</h2>

          <div className="input-group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              placeholder="Enter new task..."
              disabled={loading}
            />
            <button onClick={addTask} disabled={loading}>
              {loading ? "..." : "Add Task"}
            </button>
          </div>

          <ul className="task-list">
            {tasks.length === 0 ? (
              <li className="empty">No tasks yet. Add one above!</li>
            ) : (
              tasks.map((task) => (
                <li key={task._id} className="task-item">
                  <span>{task.title}</span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    ✕
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
