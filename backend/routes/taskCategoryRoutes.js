import express from "express";
import {
  getTaskCategories,
  addTaskCategory,
  getTaskCategory,
  updateTaskCategory,
  deleteTaskCategory,
} from "../controller/taskCategoryController.js";

import { protect } from "../middleware/authMiddleware.js";

const taskCategoryRoutes = express.Router();

taskCategoryRoutes.get("/api/taskCategory/all", protect, getTaskCategories);
taskCategoryRoutes.get("/api/taskCategory/get/:id", protect, getTaskCategory);
taskCategoryRoutes.post("/api/taskCategory/add", protect, addTaskCategory);
taskCategoryRoutes.put(
  "/api/taskCategory/update/:id",
  protect,
  updateTaskCategory
);
taskCategoryRoutes.delete(
  "/api/taskCategory/delete/:id",
  protect,
  deleteTaskCategory
);

export default taskCategoryRoutes;
