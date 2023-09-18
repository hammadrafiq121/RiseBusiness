import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statuses: [],
};

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    setsStatuses: (state, action) => {
      state.statuses = action.payload;
    },
    addStatus: (state, action) => {
      const newStatus = action.payload;
      state.statuses.push(newStatus);
    },
    updateStatus: (state, action) => {
      const { id, updatedStatus } = action.payload;

      const statusIndex = state.statuses.findIndex(
        (status) => status._id === id
      );

      if (statusIndex !== -1) {
        state.statuses[statusIndex] = {
          ...state.statuses[statusIndex],
          status: updatedStatus,
        };
      } else {
        console.log(`Status with ID ${id} not found.`);
      }
    },
    deleteStatus: (state, action) => {
      const statusId = action.payload;
      state.statuses = state.statuses.filter(
        (status) => status._id !== statusId
      );
    },
  },
});

export const { setsStatuses, addStatus, updateStatus, deleteStatus } =
  statusesSlice.actions;

export default statusesSlice.reducer;
