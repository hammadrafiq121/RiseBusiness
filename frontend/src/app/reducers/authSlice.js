import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../services/authApi";

//get the user from local storage
const user = JSON.parse(localStorage.getItem("user"));

//initial state of slice
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//register user
export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authApi.signup(token, user);
    } catch (error) {
      //multiple checks for error
      const message =
        error?.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authApi.login(user);
  } catch (error) {
    const message =
      error?.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

//create a auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "Signing up user...";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User registered successfully";
        // state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "User registeration failed";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "Signing in user...";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.message = "User logged in successfully";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Error Accured Logging In";
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "Logging out user... ";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Succesfully Logged out ";
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = true;
        state.message = action.payload || "logout failed";
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
