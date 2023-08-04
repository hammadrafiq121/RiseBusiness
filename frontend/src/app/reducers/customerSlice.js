import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerApi from "../../services/customerApi";

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await customerApi.getCustomers(token);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCustomer = createAsyncThunk(
  "customers/getCustomer",
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await customerApi.getCustomer(token, customerId);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customer, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await customerApi.addCustomer(token, customer);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, customer }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await customerApi.updateCustomer(token, id, customer);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await customerApi.deleteCustomer(token, customerId);
      return customerId;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadCustomers = createAsyncThunk(
  "customers/uploadCustomers",
  async (customers, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await customerApi.uploadCustomers(token, customers);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Getting Customers...";
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customers fetched successfully.";
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Getting Customer...";
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true; // Set the 'isSuccess' flag to indicate a successful request
        state.message = "Customer fetched successfully.";
        state.customers.push(action.payload);
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Set the 'isSuccess' flag to indicate a failed request
        state.message = action.payload;
      })
      .addCase(addCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Adding Customer...";
        state.customers = [];
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customer added successfully.";
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(uploadCustomers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Uploading Customers...";
      })
      .addCase(uploadCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customers File added successfully.";
        state.customers.push(...action.payload);
      })
      .addCase(uploadCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Updating Customer...";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customer updated successfully.";
        const { id, updatedCustomer } = action.payload;
        const customerIndex = state.customers.findIndex(
          (customer) => customer._id === id
        );
        if (customerIndex !== -1) {
          state.customers[customerIndex] = updatedCustomer;
        } else {
          console.log(`Customer with ID ${id} not found.`);
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Deleting Customer...";
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customer deleted successfully.";
        const customerId = action.payload;
        state.customers = state.customers.filter(
          (customer) => customer._id !== customerId
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;

// export const clearCustomers = createAsyncThunk(
//   "customers/clearCustomers",
//   async () => {
//     return [];
//   }
// );

// .addCase(clearCustomers.pending, (state) => {
//   state.isLoading = true;
//   state.isError = false;
//   state.isSuccess = false;
//   state.message = "";
// })
// .addCase(clearCustomers.fulfilled, (state, action) => {
//   state.isLoading = false;
//   state.isError = false;
//   state.isSuccess = true;
//   state.message = "Customers cleared successfully.";
//   state.customers = action.payload;
// })
// .addCase(clearCustomers.rejected, (state) => {
//   state.isLoading = false;
//   state.isError = true;
//   state.isSuccess = false;
//   state.message = "Failed to clear customers.";
// });
