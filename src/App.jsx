import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">🌟 Todo App with Rewards</h1>
        <p className="text-muted">Complete tasks and earn virtual coins!</p>
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

      {/* Task List */}
      {todos.length === 0 ? (
        <p className="text-center text-muted">No tasks yet. Add one above ⬆️</p>
      ) : (
        <div className="row">
          {todos.map((todo) => (
            <div className="col-md-6 mb-3" key={todo.id}>
              <div
                className={`card todo-card shadow-sm border ${
                  todo.completed ? "border-success" : ""
                }`}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <span
                    className={`me-2 ${
                      todo.completed
                        ? "text-decoration-line-through text-muted"
                        : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div>
                    {!todo.completed && (
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => completeTodo(todo.id)}
                      >
                        ✅ Complete
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeTodo(todo.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coin Reward */}
      {completedCount > 0 && (
        <div className="alert alert-warning mt-4 text-center reward-coin">
           Awesome 🎉 You've earned <strong>{completedCount * 10} coins</strong> for
          completing {completedCount} task{completedCount > 1 ? "s" : ""}!
        </div>
      )}
    </div>
  );
}

export default App;
