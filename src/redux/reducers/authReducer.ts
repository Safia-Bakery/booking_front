import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";

interface State {
  token: string | null;
  me: {
    id: number;
    username: string;
    role?: string;
    full_name: string;
  } | null;
}

const initialState: State = {
  token: null,
  me: null,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: () => {
      localStorage.clear();
    },

    tokenHandler: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.token;
export const roleSelector = (state: RootState) => state.auth.me;

export const { tokenHandler, logoutHandler } = authReducer.actions;

export default authReducer.reducer;
