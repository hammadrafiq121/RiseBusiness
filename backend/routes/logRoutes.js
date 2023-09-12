import express from "express";
import Log from "../model/logSchema.js";
import logger from "../utils/logger.js";

const logRoutes = express.Router();

logRoutes.post("/api/logs", async (req, res) => {
  const { userId, action, details } = req.body;

  // Log the event
  logger.info(`"userId" - "action": "details"`);
  // logger.info(`${userId} - ${action}: ${details}`);

  // Save log entry to MongoDB
  const logEntry = new Log({ userId, action, details });
  await logEntry.save();

  res.sendStatus(200);
});

export default logRoutes;
