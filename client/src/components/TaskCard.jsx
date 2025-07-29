export default function TaskCard({ task, onMarkDone, onDelete }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4 border">
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm">
        Due:{" "}
        {task.dueDate instanceof Date
          ? task.dueDate.toDateString()
          : String(task.dueDate)}
        {" • "}
        <span className={task.isOverdue() ? "text-red-500" : "text-green-600"}>
          {task.status}
        </span>
      </p>

      {task.status !== "done" && (
        <button
          className="mt-2 text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 mr-2"
          onClick={() => onMarkDone(task.id)}
        >
          Mark as Done
        </button>
      )}

      <button
        className="mt-2 text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
}
