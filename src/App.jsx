import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editObj, setEditObj] = useState({
    _id: "",
    content: "",
    completed: false,
  });

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/v1/todos", requestOptions)
      .then((response) => response.json())
      .then((result) => setTodos(result.data))
      .catch((error) => console.log("error", error));
  }, []);

  const [newTodo, setNewTodo] = useState("");

  const updateTodoHandler = async () => {
    // Find the index of object them complete object
    const itemIndex = todos.findIndex((item) => item._id === editObj._id);

    const newTodos = [...todos];

    var raw = {
      content: editObj.content,
      completed: editObj.completed,
    };

    var requestOptions = {
      method: "PUT",
      body: JSON.stringify(raw),
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:4000/api/v1/todos/${editObj._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        newTodos[itemIndex] = JSON.parse(result).data;
        // Finally setstate
        setTodos(newTodos);
        setIsEditMode(false);
        setEditObj({ _id: "", content: "", completed: false });
      })
      .catch((error) => console.log("error", error));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    // Create New Todo Object
    const newTodoItem = {
      content: newTodo,
      completed: false,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(newTodoItem),
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:4000/api/v1/todos", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const JSONData = JSON.parse(result);
        // Set State
        setTodos((pre) => [...pre, JSONData.data]);
        // Set the form to Empty
        setNewTodo("");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: "black", height: "100vh", color: "white" }}
    >
      <h2>Todo App</h2>

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
            {/* Defualt State */}

            {editObj._id !== item._id ? (
              <>
                <input
                  type="checkbox"
                  checked={item.completed}
                  disabled={true}
                />
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "unset",
                  }}
                >
                  {item.content}
                </span>
                <button
                  style={{ marginLeft: "15px" }}
                  onClick={() => {
                    setIsEditMode(true);
                    setEditObj({
                      _id: item._id,
                      completed: item.completed,
                      content: item.content,
                    });
                  }}
                >
                  Edit
                </button>
              </>
            ) : (
              ""
            )}
            {/* End Default State */}

            {/* Edit State */}
            {isEditMode && item._id === editObj._id ? (
              <>
                <input
                  type="checkbox"
                  checked={editObj.completed}
                  onChange={(e) =>
                    setEditObj((pre) => ({
                      ...pre,
                      completed: e.target.checked,
                    }))
                  }
                />
                <input
                  type="text"
                  value={editObj.content}
                  onChange={(e) =>
                    setEditObj((pre) => ({ ...pre, content: e.target.value }))
                  }
                />
                <button
                  style={{ marginLeft: "15px" }}
                  onClick={() => updateTodoHandler()}
                >
                  Update
                </button>
              </>
            ) : (
              ""
            )}
            {/* End Edit State */}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
