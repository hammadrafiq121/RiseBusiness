import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./database/dbConfig.js";
import customerRoutes from "./routes/customerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import LogEntry from "./model/logSchema.js";

dotenv.config();
const PORT = process.env.PORT;
const user = process.env.DATABASE_USERNAME;
const pass = process.env.DATABASE_PASSWORD;
Connection(user, pass);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

// User Routes
app.use("/", userRoutes);
// Customer Routes
app.use("/", customerRoutes);
//Log Route
app.use("/", logRoutes);
//Status Route
app.use("/", statusRoutes);

// Routes
app.get("/api/logs", async (req, res) => {
  try {
    const logs = await LogEntry.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Error fetching logs" });
  }
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
