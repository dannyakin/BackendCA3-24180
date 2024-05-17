import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import cartReducer from "./Slice/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
