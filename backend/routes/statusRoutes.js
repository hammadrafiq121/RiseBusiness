import express from "express";
import {
  getStatuses,
  addStatus,
  getStatus,
  updateStatus,
} from "../controller/statusController.js";
const statusRoutes = express.Router();

statusRoutes.get("/api/statuses/all", getStatuses);
statusRoutes.get("/api/statuses/get/:id", getStatus);
statusRoutes.post("/api/statuses/add", addStatus);
statusRoutes.put("/api/statuses/update/:id", updateStatus);

export default statusRoutes;
