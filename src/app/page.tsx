"use client";

import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText("");
    }
  };

  const handleToggle = (id: number) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter a todo" className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`flex items-center justify-between py-2 px-4 border-b ${todo.completed ? "bg-green-100" : ""}`}>
            <span className={`flex-grow ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</span>
            <div>
              <button onClick={() => handleToggle(todo.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleDelete(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
