import { combineReducers } from "@reduxjs/toolkit";
import auth from "./authReducer";
import reservations from "./reservations";
import room from "./room";

export default combineReducers({
  auth,
  reservations,
  room,
});
