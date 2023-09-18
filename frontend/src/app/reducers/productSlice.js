import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setsProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      const newProduct = action.payload;
      state.products.push(newProduct);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;

      const productIndex = state.products.findIndex(
        (product) => product._id === id
      );

      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          product: updatedProduct,
        };
      } else {
        console.log(`Product with ID ${id} not found.`);
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
    },
  },
});

export const { setsProducts, addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
