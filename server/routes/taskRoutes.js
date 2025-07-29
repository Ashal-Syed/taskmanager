import express from "express";
import {
  getTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;
