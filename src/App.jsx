import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import confetti from "canvas-confetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (stored) setTodos(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Confetti on full completion
  const completedCount = todos.filter((t) => t.completed).length;
  useEffect(() => {
    if (todos.length > 0 && completedCount === todos.length) {
      confetti();
    }
  }, [completedCount, todos.length]);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
    toast.success("📝 Task added!");
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
    toast.success("✅ Task completed!");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.info("🗑️ Task removed.");
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditInput(todo.text);
  };

  const saveEdit = (id) => {
    if (editInput.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editInput } : todo
      )
    );
    setEditingId(null);
    setEditInput("");
    toast.success("✏️ Task updated!");
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? todo.completed
      : !todo.completed
  );

  const progress =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="container py-4">
      {/* Toast */}
      <ToastContainer position="top-center" />

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group">
          <button
            className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn btn-outline-secondary ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`btn btn-outline-success ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Enter a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button className="btn btn-success" onClick={addTodo}>
          Add Task
        </button>
      </div>

      {/* Progress Bar */}
      {todos.length > 0 && (
        <div className="progress mb-4">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Task List */}
      {filteredTodos.length === 0 ? (
        <p className="text-center text-muted">No tasks. Add one above ⬆️</p>
      ) : (
        <div className="row">
          {filteredTodos.map((todo) => (
            <div className="col-md-6 mb-3" key={todo.id}>
              <div
                className={`card todo-card shadow-sm border ${
                  todo.completed ? "border-success" : ""
                } animate__animated animate__fadeInUp`}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  {editingId === todo.id ? (
                    <>
                      <input
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        className="form-control form-control-sm me-2"
                      />
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => saveEdit(todo.id)}
                      >
                        💾 Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span
                        className={`me-2 ${
                          todo.completed
                            ? "text-decoration-line-through text-muted"
                            : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                      <div className="d-flex">
                        {!todo.completed && (
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => completeTodo(todo.id)}
                          >
                            ✅ Complete
                          </button>
                        )}
                        {!todo.completed && (
                          <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => startEdit(todo)}
                          >
                            ✏️ Edit
                          </button>
                        )}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeTodo(todo.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coin Reward */}
      {completedCount > 0 && (
        <div className="alert alert-warning mt-4 text-center reward-coin">
          Awesome 🎉 You've earned{" "}
          <strong>{completedCount * 10} coins</strong> for completing{" "}
          {completedCount} task{completedCount > 1 ? "s" : ""}!
        </div>
      )}
    </div>
  );
}

export default App;
