import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../services/productApi";
const initialState = {
  products: [],
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await productApi.getProducts(token);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSelectedProducts = createAsyncThunk(
  "products/getSelectedProducts",
  async (productIds, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await productApi.getSelectedProducts(token, productIds);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await productApi.addProduct(token, product);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await productApi.updateProduct(
        token,
        id,
        updatedProduct
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await productApi.deleteProduct(token, productId);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getSelectedProducts.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { _id, product } = action.payload;
        const productIndex = state.products.findIndex(
          (product) => product._id === _id
        );
        if (productIndex !== -1) {
          state.products[productIndex] = {
            ...state.products[productIndex],
            product: product,
          };
        } else {
          console.log(`product with ID ${id} not found.`);
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { _id } = action.payload;
        state.products = state.products.filter(
          (product) => product._id !== _id
        );
      });
  },
});

export const { reset } = productsSlice.actions;

export default productsSlice.reducer;

// reducers: {
//   setsProducts: (state, action) => {
//     state.products = action.payload;
//   },
//   addProduct: (state, action) => {
//     const newProduct = action.payload;
//     state.products.push(newProduct);
//   },
//   updateProduct: (state, action) => {
//     const { id, updatedProduct } = action.payload;

//     const productIndex = state.products.findIndex(
//       (product) => product._id === id
//     );

//     if (productIndex !== -1) {
//       state.products[productIndex] = {
//         ...state.products[productIndex],
//         product: updatedProduct,
//       };
//     } else {
//       console.log(`Product with ID ${id} not found.`);
//     }
//   },
//   deleteProduct: (state, action) => {
//     const productId = action.payload;
//     state.products = state.products.filter(
//       (product) => product._id !== productId
//     );
//   },
// },
