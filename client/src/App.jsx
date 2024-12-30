import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  var [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios("http://localhost:3000/todos");
      console.log(response.data); // Debugging response data
      setTodos(response.data.todo); // Update the `todos` state with the data
    } catch (error) {
      console.error("Error fetching todos:", error.message); // Handle errors
    }
  };

  const Submit = async (event) => {
    event.preventDefault();
    console.log(input);

    const response = await axios.post("http://localhost:3000/todos", {
      title: input,
    });

    console.log(response);
    setInput("");
    getData();
    // setTodos([...todos, response.data.todo]);
  };

  const edit = async (id, index) => {
    const update = prompt("enter new todo");
    const response = await axios.put(`http://localhost:3000/todos/${id}`, {
      title: update,
    });
    console.log(response.data);
    todos[index].title = update;
    setTodos([...todos]);

    // const updatedTodo = response.data.todo;
    //   setTodos((prevTodos) =>
    //     prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    //   );
    // getData();
    // console.log(todos);
  };

  const deletetodo = async (id, index) => {
    const response = await axios.delete(`http://localhost:3000/todos/${id}`);
    console.log(response.data);
    console.log("deleted", id);
    todos.splice(index, 1);
    setTodos([...todos]);

  };

  return (
    <>
      <h1 className="text-center text-2xl">Todo App</h1>
      <div>
        <form onSubmit={Submit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter todo here"
            className="mx-4 input input-bordered input-info w-full max-w-xs"
          />
          <button className="btn btn-info">Add Todo</button>
        </form>
      </div>
      <div>
        {todos.length > 0 ? (
          <ul className="list-decimal pl-5 space-y-3">
            {todos.map((item, index) => (
              <li key={item.id} className="flex items-center justify-between">
                <span className="text-gray-800 text-lg">{item.title}</span>

                <div className="space-x-2">
                  <button
                    onClick={() => edit(item.id, index)}
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletetodo(item.id, index)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No data</p>
        )}
      </div>
    </>
  );
}

export default App;
