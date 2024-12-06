'use client';

import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/todos');
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }),
      });

      if (!res.ok) throw new Error('Failed to add todo');
      fetchTodos();
      setNewTask('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id, completed) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/todos/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !completed }),
      });

      if (!res.ok) throw new Error('Failed to update todo');
      fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/todos/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Failed to delete todo');
      fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-6">
      <div className="bg-secondary text-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h1 className="text-4xl font-bold text-center mb-8">My To-Do List</h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Todo Form */}
        <TodoForm newTask={newTask} setNewTask={setNewTask} addTodo={addTodo} />

        {/* Loading State */}
        {loading && <p className="text-accent text-center mb-4">Loading...</p>}

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        {/* Empty State */}
        {!loading && todos.length === 0 && (
          <p className="text-accent text-center mt-6">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}
