import pool from "../db/index.js";

export async function getTasks(req, res) {
  const result = await pool.query("SELECT * FROM taskmanager ORDER BY due_date ASC");
  res.json(result.rows);
}

// export async function addTask(req, res) {
//   const { title, description, dueDate } = req.body;
//   console.log("📥 Add Task Request:", { title, description, dueDate });

//   const result = await pool.query(
//     "INSERT INTO taskmanager (title, description, due_date, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
//     [title, description, dueDate]
//   );
//   console.log("✅ Inserted:", result.rows[0]);

//   res.status(201).json(result.rows[0]);
// }

export async function addTask(req, res) {
  const { title, description, dueDate } = req.body;
  console.log("📥 Incoming Task:", { title, description, dueDate });

  try {
    const result = await pool.query(
      "INSERT INTO taskmanager (title, description, due_date, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
      [title, description, dueDate]
    );
    console.log("✅ Task inserted:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting task:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
}


export async function updateTaskStatus(req, res) {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE taskmanager SET status = 'done' WHERE id = $1 RETURNING *",
    [id]
  );
  res.json(result.rows[0]);
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  await pool.query("DELETE FROM taskmanager WHERE id = $1", [id]);
  res.sendStatus(204);
}
