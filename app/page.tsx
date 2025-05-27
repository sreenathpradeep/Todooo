'use client';
import { useState, useEffect } from "react";

export default function Home () {

  interface Todo {
  id: number
  text: string
  completed: boolean
}

  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  // Add todos to the list
  
  const addTodo = () => {
    if (!input.trim()) return
  
    const newTodo: Todo = {
      id: Date.now(), // simple unique ID
      text: input.trim(),
      completed: false
    }
  
    setTodos([newTodo, ...todos]) // Add to top of list
    setInput('') // Clear input
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  // Delete a todo

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  
  //loads locally stored todos

  useEffect(() => {
    const stored = localStorage.getItem('todos')
    if (stored) {
      setTodos(JSON.parse(stored))
    }
  }, [])
  
  // Saves todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  
  


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
  <h1 className="text-3xl font-bold mb-6">Todooo</h1>

  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    className="border p-2 rounded w-full max-w-md"
    placeholder="Add a new todo"
  />
  <button
    onClick={addTodo}
    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
  >
    Add
  </button>
  
  <ul className="w-full max-w-md mt-6">
  {todos.map((todo) => (
    <li
      key={todo.id}
      className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
    >
      <span
      className={`flex-1 cursor-pointer ${
        todo.completed ? 'line-through text-gray-400' : ''
      }`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 ml-4"
      >
        Delete
      </button>


    </li>
  ))}
</ul>



  </main>


  )
}
