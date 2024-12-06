export default function TodoForm({ newTask, setNewTask, addTodo }) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-4 py-2 bg-primary text-white rounded-lg border border-accent focus:outline-none focus:ring focus:ring-accent"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
    );
  }
  