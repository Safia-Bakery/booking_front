import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { AuthTypes } from "src/utils/types";

interface State {
  tokens: AuthTypes | null;
  me: {
    id: number;
    username: string;
    role?: string;
    full_name: string;
  } | null;
}

const initialState: State = {
  tokens: null,
  me: null,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: state => {
      state.tokens = null;
      localStorage.clear();
    },

    tokenHandler: (state, { payload }: PayloadAction<AuthTypes>) => {
      state.tokens = payload;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.tokens;
export const roleSelector = (state: RootState) => state.auth.me;

export const { tokenHandler, logoutHandler } = authReducer.actions;

export default authReducer.reducer;
