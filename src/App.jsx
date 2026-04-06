import React, { useEffect, useState } from "react";
import { NotebookPen } from "lucide-react";
import axios from "axios";
import "./App.css";
import Todo from "./Todo";
export default function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  //create todo and update todo
  const handleEdit = (item) => {
    console.log(item);
    setInput(item.title || "");
    setEditId(item._id);
  };
  const handleSubmit = async (e, _id) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (editId) {
      const result = await axios.put(`https://todo-backend-15eb.onrender.com/app/${editId}`, {
        title: input,
      });

      const updatedTodo = result.data.updated;

      const editedTodo = todo.map((item) => {
        if (item._id === editId) {
          return updatedTodo;
        } else {
          return item;
        }
      });
      console.log(editedTodo);
      setTodo(editedTodo);
    } else {
      const result = await axios.post("https://todo-backend-15eb.onrender.com/app/create", {
        title: input,
      });
      const newTodo = result.data;
      const todos = [...todo, newTodo];
      setTodo(todos);
      setEditId(null);
      setInput("");
    }
  };

  //delete todo
  const handleDelete = async (_id) => {
    await axios.delete(`https://todo-backend-15eb.onrender.com/app/${_id}`);

    const deleted = todo.filter((item) => item._id !== _id);
    setTodo(deleted);
  };
  // display todo

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://todo-backend-15eb.onrender.com/app/display");
      setTodo(result.data);
    };
    fetchData();
  }, []);
  const taskList =
    todo.length === 0 ? (
      <div className="empty-container">
        {" "}
        <h3>No task Available</h3> <NotebookPen />
      </div>
    ) : (
      todo.map((item, index) => {
        return (
          <div key={item._id}>
            <Todo
              value={item}
              todo={todo}
              add={handleSubmit}
              remove={handleDelete}
              update={handleEdit}
            />
          </div>
        );
      })
    );
  return (
    <>
      <h1>ToDO App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={input || ""}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn">{editId ? "Update" : "Add"}</button>
      </form>

      <ul>{taskList}</ul>
    </>
  );
}
