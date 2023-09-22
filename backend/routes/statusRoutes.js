import express from "express";
import {
  getStatuses,
  addStatus,
  getStatus,
  updateStatus,
  deleteStutus,
} from "../controller/statusController.js";
import { protect } from "../middleware/authMiddleware.js";

const statusRoutes = express.Router();

statusRoutes.get("/api/statuses/all", protect, getStatuses);
statusRoutes.get("/api/statuses/get/:id", protect, getStatus);
statusRoutes.post("/api/statuses/add", protect, addStatus);
statusRoutes.put("/api/statuses/update/:id", protect, updateStatus);
statusRoutes.delete("/api/statuses/delete/:id", protect, deleteStutus);

export default statusRoutes;
