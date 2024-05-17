import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";
const currentUserCookie = Cookies.get("currentUser");
const userDetails = currentUserCookie ? JSON.parse(currentUserCookie) : null;

const initialState = {
  currentUser: userDetails,
  isAuthenticated: userDetails ? true : false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});
export default authSlice.reducer;
export const { setUser, signOut } = authSlice.actions;
