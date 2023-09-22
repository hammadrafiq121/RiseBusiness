import Product from "../model/productSchema.js";

export const addProduct = async (req, res) => {
  const { product, slug } = req.body;
  try {
    const existingProduct = await Product.findOne({ product: product });
    console.log(existingProduct);
    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists" });
    }
    const newProduct = await Product.create({
      product,
      slug,
    });
    await newProduct.save();
    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getSelectedProducts = async (req, res) => {
  try {
    const { productIds } = req.body;

    const products = await Product.find({ _id: { $in: productIds } });
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateProduct = async (request, response) => {
  try {
    const productId = request.params.id;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      request.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      return response.status(200).json(updatedProduct);
    } else {
      return response.status(404).json({ error: "Status not updated" });
    }
  } catch (error) {
    return response.status(500).json({ error: "Failed to update Product" });
  }
};

export const deleteProduct = async (request, response) => {
  try {
    const productId = request.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return response.status(200).json(deletedProduct);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
