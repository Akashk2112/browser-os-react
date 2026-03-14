import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windows: {
    finder: false,
    message: false,
    chrome: false,
    calculator: false,
    calendar: false,
    settings: false,
    trash_empty: false,
  },
};

export const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    openWindow: (state, action) => {
      const appId = action.payload;
      state.windows[appId] = true;
    },

    closeWindow: (state, action) => {
      const appId = action.payload;
      state.windows[appId] = false;
    },
    focusWindow: (state, action) => {
      const id = action.payload;

      if (state.windows[id].isOpen) {
        state.topZ += 1;
        state.windows[id].z = state.topZ;
      }
    },
  },
});

export const { openWindow, closeWindow,focusWindow } = windowSlice.actions;

export default windowSlice.reducer;
