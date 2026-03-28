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
  minimized: {
    finder: false,
    message: false,
    chrome: false,
    calculator: false,
    calendar: false,
    settings: false,
    trash_empty: false,
  },
  maximized: {
    finder: false,
    message: false,
    chrome: false,
    calculator: false,
    calendar: false,
    settings: false,
    trash_empty: false,
  },
  activeWindow: null,

  windowPositions: {
    finder: { x: 200, y: 120 },
    message: { x: 300, y: 150 },
    chrome: { x: 400, y: 150 },
    calculator: { x: 500, y: 150 },
    calendar: { x: 600, y: 150 },
    settings: { x: 700, y: 150 },
    trash_empty: { x: 800, y: 150 },
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

    setActiveWindow: (state, action) => {
      state.activeWindow = action.payload;
    },

    focusWindow: (state, action) => {
      const id = action.payload;

      if (state.windows[id].isOpen) {
        state.topZ += 1;
        state.windows[id].z = state.topZ;
      }
    },
    minimizeWindow: (state, action) => {
      const appId = action.payload;
      state.minimized[appId] = true;
    },
    unminimizeWindow: (state, action) => {
      const appId = action.payload;
      state.minimized[appId] = false;
    },
    setWindowPosition: (state, action) => {
      const { id, x, y } = action.payload;
      state.windowPositions[id] = { x, y };
    },
    toggleMaximize: (state, action) => {
      const appId = action.payload;
      if (appId) {
        state.maximized[appId] = !state.maximized[appId];
      }
    },
  },
});

export const {
  openWindow,
  closeWindow,
  focusWindow,
  setActiveWindow,
  minimizeWindow,
  unminimizeWindow,
  setWindowPosition,
  toggleMaximize,
} = windowSlice.actions;

export default windowSlice.reducer;
