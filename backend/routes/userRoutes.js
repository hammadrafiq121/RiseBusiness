import express from "express";
import {
  loginUser,
  signupUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
const userRoutes = express.Router();

//auth
userRoutes.post("/api/user/login", loginUser);
userRoutes.post(
  "/api/user/signup",
  protect,
  roleMiddleware(["admin"]),
  signupUser
);
//user
userRoutes.get("/api/users", protect, getAllUsers);
userRoutes.get("/api/users/:id", protect, getSingleUser);
userRoutes.put("/api/users/:id", protect, updateUser);
userRoutes.delete("/api/users/:id", protect, deleteUser);

export default userRoutes;
