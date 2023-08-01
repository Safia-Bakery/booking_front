import { combineReducers } from "@reduxjs/toolkit";
import auth from "./authReducer";
import reservations from "./reservations";

export default combineReducers({
  auth,
  reservations,
});
