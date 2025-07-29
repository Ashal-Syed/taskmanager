import { useState, useEffect } from "react";
import Task from "./models/Task";
import TaskCard from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";
import { fetchTasks, addTask, markTaskAsDone, deleteTask } from "./services/taskService";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc
  const [statusFilter, setStatusFilter] = useState("all"); // all | done | pending

  useEffect(() => {
    fetchTasks().then((data) => {
      const taskObjs = data.map(
        (t) => new Task(t.id, t.title, t.description, t.due_date, t.status)
      );
      setTasks(taskObjs);
    });
  }, []);

  const handleAddTask = async (title, description, dueDate) => {
    const newTask = await addTask(title, description, dueDate);
    setTasks((prev) => [
      ...prev,
      new Task(
        newTask.id,
        newTask.title,
        newTask.description,
        newTask.due_date,
        newTask.status
      ),
    ]);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleMarkDone = async (taskId) => {
    const updated = await markTaskAsDone(taskId);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? new Task(
              updated.id,
              updated.title,
              updated.description,
              updated.due_date,
              updated.status
            )
          : task
      )
    );
  };

  const filtered = tasks
    .filter((t) => statusFilter === "all" || t.status === statusFilter)
    .sort((a, b) =>
      sortOrder === "asc" ? a.dueDate - b.dueDate : b.dueDate - a.dueDate
    );

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <AddTaskForm onAdd={handleAddTask} />

      <div className="flex items-center gap-4 mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="asc">Due Date ↑</option>
          <option value="desc">Due Date ↓</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMarkDone={handleMarkDone}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
