import express from "express";
import {
  addProduct,
  getProducts,
  getSelectedProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
const productRoutes = express.Router();

productRoutes.post("/api/products/add", addProduct);
productRoutes.get("/api/products/all", getProducts);
productRoutes.post("/api/products/selectedProducts", getSelectedProducts);
productRoutes.put("/api/products/update/:id", updateProduct);
productRoutes.delete("/api/products/delete/:id", deleteProduct);

export default productRoutes;
