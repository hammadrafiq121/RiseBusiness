import express from "express";
import {
  addProduct,
  getProducts,
  getSelectedProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

productRoutes.post("/api/products/add", protect, addProduct);
productRoutes.get("/api/products/all", protect, getProducts);
productRoutes.post(
  "/api/products/selectedProducts",
  protect,
  getSelectedProducts
);
productRoutes.put("/api/products/update/:id", protect, updateProduct);
productRoutes.delete("/api/products/delete/:id", protect, deleteProduct);

export default productRoutes;
