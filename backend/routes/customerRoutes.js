import express from "express";
import {
  addCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
  uploadCustomers,
} from "../controller/customerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, callback) {
    const date = new Date()
      .toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .replace(/:/g, "-");
    // const originalname = file.originalname.replace(/\s+/g, "_"); // Replace spaces with underscores
    const filename = `${date} ${file.originalname}`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

const customerRoutes = express.Router();

customerRoutes.post("/api/customers", protect, addCustomer);
customerRoutes.get("/api/customers", protect, getAllCustomers);
customerRoutes.get("/api/customers/:id", protect, getSingleCustomer);
customerRoutes.put("/api/customers/:id", protect, updateCustomer);
customerRoutes.delete("/api/customers/:id", protect, deleteCustomer);
customerRoutes.post(
  "/api/customers/upload",
  protect,
  roleMiddleware(["admin", "manager"]),
  upload.single("csvFile"),
  uploadCustomers
);

export default customerRoutes;
