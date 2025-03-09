import React, { useReducer, useEffect, useState } from "react";
import './Style.css';
import Button from "./Button";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "SET_TODOS":
      return action.payload;
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log( todos);
  }, [todos]);

  const addTodoHandler = () => {
    if (!title.trim()) {
      alert("No todos, please type something");
      return;
    }
    if (!date) {
      alert("No date, please enter a date");
      return;
    }
    const newTodo = {
      id: Math.random().toString(),
      title,
      date,
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
    console.log("Added Todo:", newTodo);
    setTitle("");
    setDate("");
  };

  const editTodoHandler = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
    
  };

  const deleteTodoHandler = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
    console.log(id);
  };

  return (
    <main className="container">
      <h1>Todo-app</h1>
      <section className="todoBox">
        <div className="inputsBlock">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={addTodoHandler} type='button'>
            Add Todo
          </Button>
        </div>
        <ul className="todoList">
          {todos.map(({ id, title, date, completed }) => (
            <li key={id} className={completed ? "completed" : ""}>
              <strong style={{ textDecoration: completed ? "line-through" : "none" }}>{title}</strong> - (<span>{date}</span>)
              <input
                type="checkbox"
                checked={completed}
                onChange={() => editTodoHandler(id)}
              />
              <Button type='button' onClick={() => deleteTodoHandler(id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default TodoApp;
