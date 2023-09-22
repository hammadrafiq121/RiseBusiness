import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statusApi from "../../services/statusApi";

const initialState = {
  statuses: [],
};

export const getAllStatus = createAsyncThunk(
  "statuses/getAllStatus",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await statusApi.getAllStatus(token);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStatus = createAsyncThunk(
  "statuses/getStatus",
  async (statusId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await statusApi.getStatus(token, statusId);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addStatus = createAsyncThunk(
  "statuses/addStatus",
  async (status, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await statusApi.addStatus(token, status);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "statuses/updateStatus",
  async ({ id, updatedStatus }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await statusApi.updateStatus(token, id, updatedStatus);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteStatus = createAsyncThunk(
  "statuses/deleteStatus",
  async (statusId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await statusApi.deleteStatus(token, statusId);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStatus.fulfilled, (state, action) => {
        state.statuses = action.payload;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.statuses.push(action.payload);
      })

      .addCase(addStatus.fulfilled, (state, action) => {
        state.statuses.push(action.payload);
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const { _id, status } = action.payload;
        const statusIndex = state.statuses.findIndex(
          (status) => status._id === _id
        );
        if (statusIndex !== -1) {
          state.statuses[statusIndex] = {
            ...state.statuses[statusIndex],
            status: status,
          };
        } else {
          console.log(`Status with ID ${id} not found.`);
        }
      })
      .addCase(deleteStatus.fulfilled, (state, action) => {
        const { _id } = action.payload;
        state.statuses = state.statuses.filter((status) => status._id !== _id);
      });
  },
});

export const { reset } = statusesSlice.actions;

export default statusesSlice.reducer;

// reducers: {
// setsStatuses: (state, action) => {
//   state.statuses = action.payload;
// },
// addStatus: (state, action) => {
//   const newStatus = action.payload;
//   state.statuses.push(newStatus);
// },
// updateStatus: (state, action) => {
//   const { id, updatedStatus } = action.payload;
//   const statusIndex = state.statuses.findIndex(
//     (status) => status._id === id
//   );
//   if (statusIndex !== -1) {
//     state.statuses[statusIndex] = {
//       ...state.statuses[statusIndex],
//       status: updatedStatus,
//     };
//   } else {
//     console.log(`Status with ID ${id} not found.`);
//   }
// },
// deleteStatus: (state, action) => {
//   const statusId = action.payload;
//   state.statuses = state.statuses.filter(
//     (status) => status._id !== statusId
//   );
// },
// },
