import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskCategoryApi from "../../services/taskCategoryApi.jsx";

const initialState = {
  taskCategories: [],
};

export const getTaskCategories = createAsyncThunk(
  "taskCategories/getTaskCategories",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await taskCategoryApi.getTaskCategories(token);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTaskCategory = createAsyncThunk(
  "taskCategories/getTaskCategory",
  async (taskCategoryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await taskCategoryApi.getTaskCategory(
        token,
        taskCategoryId
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addTaskCategory = createAsyncThunk(
  "taskCategories/addTaskCategory",
  async (taskCategory, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await taskCategoryApi.addTaskCategory(
        token,
        taskCategory
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTaskCategory = createAsyncThunk(
  "taskCategories/updateTaskCategory",
  async ({ id, updatedTaskCategory }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await taskCategoryApi.updateTaskCategory(
        token,
        id,
        updatedTaskCategory
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTaskCategory = createAsyncThunk(
  "taskCategories/deleteTaskCategory",
  async (taskCategoryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await taskCategoryApi.deleteTaskCategory(
        token,
        taskCategoryId
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const taskCategorySlice = createSlice({
  name: "taskCategories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskCategories.fulfilled, (state, action) => {
        state.taskCategories = action.payload;
      })
      .addCase(getTaskCategory.fulfilled, (state, action) => {
        state.taskCategories.push(action.payload);
      })

      .addCase(addTaskCategory.fulfilled, (state, action) => {
        state.taskCategories.push(action.payload);
      })
      .addCase(updateTaskCategory.fulfilled, (state, action) => {
        const { _id, taskCategory } = action.payload;
        const index = state.taskCategories.findIndex(
          (category) => category._id === _id
        );
        if (index !== -1) {
          state.taskCategories[index] = {
            ...state.taskCategories[index],
            taskCategory: taskCategory,
          };
        } else {
          console.log(`task category with ID ${id} not found.`);
        }
      })
      .addCase(deleteTaskCategory.fulfilled, (state, action) => {
        const { _id } = action.payload;
        state.taskCategories = state.taskCategories.filter(
          (category) => category._id !== _id
        );
      });
  },
});

export const { reset } = taskCategorySlice.actions;

export default taskCategorySlice.reducer;
