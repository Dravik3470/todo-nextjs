export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
      <li className="flex flex-col sm:flex-row items-center justify-between bg-primary rounded-lg p-4 shadow hover:shadow-lg transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span
            onClick={() => toggleTodo(todo.id, todo.completed)}
            className={`cursor-pointer ${
              todo.completed ? 'line-through text-accent' : 'text-white'
            }`}
          >
            {todo.task}
          </span>
          <span className="text-xs text-accent sm:ml-4">
            Last Updated: {new Date(todo.lastUpdatedAt).toLocaleString()}
          </span>
        </div>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <button
            onClick={() => toggleTodo(todo.id, todo.completed)}
            className="text-green-400 hover:text-green-500 transition"
          >
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-600 transition"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
  