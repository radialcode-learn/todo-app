import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: "Wake up early",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      content: "Go To Radial Code ",
      completed: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      content: "Complete your assignments",
      completed: false,
      createdAt: new Date(),
    },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const updateTodoHandler = (isChecked, id) => {
    // Find the index of object them complete object
    const itemIndex = todos.findIndex((item) => item.id === id);
    const newTodoItem = [...todos][itemIndex];
    newTodoItem.completed = isChecked;
    console.log({ newTodoItem });
    // Update the todos state
    const newTodos = [...todos];
    // Find the object to update
    newTodos[itemIndex] = newTodoItem;
    // Finally setstate
    setTodos(newTodos);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Create New Todo Object
    const newTodoItem = {
      id: Math.floor(Math.random() * 1000),
      content: newTodo,
      completed: false,
      createdAt: new Date(),
    };

    // Set State
    setTodos((pre) => [...pre, newTodoItem]);

    // Set the form to Empty
    setNewTodo("");
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: "black", height: "100vh", color: "white" }}
    >
      <h2 style={{ margin: "0px" }}>Todo App</h2>

      {/* Create a new to-do */}
      <form onSubmit={formSubmitHandler} style={{ marginTop: "50px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Checklist */}
      <ol>
        {todos.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={(e) => updateTodoHandler(e.target.checked, item.id)}
            />
            <span
              contentEditable={true}
              style={{
                textDecoration: item.completed ? "line-through" : "unset",
              }}
            >
              {item.content}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
