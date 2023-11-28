import express from "express";
import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const taskRoutes = express.Router();

taskRoutes.get("/tasks/all", protect, getAllTasks);
taskRoutes.post("/tasks/add", protect, createTask);
taskRoutes.get("/tasks/:id", protect, getTask);
taskRoutes.put("/tasks/:id", protect, updateTask);
taskRoutes.delete("/tasks/:id", protect, deleteTask);

export default taskRoutes;
