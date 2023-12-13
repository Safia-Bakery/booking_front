import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { AuthTypes } from "src/utils/types";

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

// ya29.a0AbVbY6OIh6je8lKlspzp3WrWmCxRA8MPxaCr4RTQB-T2_zCJyvdDO-Z26C0kCFFNH4kxitUcKHqgr5j4P3rwdO1L_Ml6ZkFf2VDRDkfGSaXyTa_aRGceLeWN2jzD-Z31599_5onvl8-FyhNazX0Nc0ze9EVuaCgYKAScSARISFQFWKvPlM6aq7nLcAC0PfVbp2f3LHg0163

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: state => {
      state.token = null;
    },

    tokenHandler: (state, { payload }: PayloadAction<AuthTypes>) => {
      state.token = payload.jwt_token;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.token;

export const roleSelector = (state: RootState) => state.auth.me;

export const { tokenHandler, logoutHandler } = authReducer.actions;

export default authReducer.reducer;
