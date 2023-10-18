import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);
      if (index >= 0) {
        state[index] = {
          ...state[index],
          qty: state[index].qty + 1,
        };
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },
    removeItem: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload);
      if (index >= 0) {
        if (state[index].qty > 1) {
          state[index] = {
            ...state[index],
            qty: state[index].qty - 1,
          };
        } else {
          state.splice(index, 1);
        }
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
