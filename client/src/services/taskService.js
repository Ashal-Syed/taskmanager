const API_URL = "http://localhost:5050/api/tasks";

export async function fetchTasks() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function addTask(title, description, dueDate) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, dueDate }),
  });
  return await res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}


export async function markTaskAsDone(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
  });
  return await res.json();
}
