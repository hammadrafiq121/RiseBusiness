import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: false }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
