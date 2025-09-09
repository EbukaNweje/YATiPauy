import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  depositAmout: "",
};

const authSlice = createSlice({
  name: "YATipauy",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },

    depositedAmount: (state, action) => {
      state.depositAmout = action.payload;
    },
  },
});

export const { loginSuccess, logout, depositedAmount } = authSlice.actions;
export default authSlice.reducer;
