import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";

interface State {
  room_id: number;
  animating: boolean;
}

const initialState: State = {
  room_id: 1,
  animating: false,
};

export const reservations = createSlice({
  name: "room",
  initialState,
  reducers: {
    roomNumberHandler: (state, { payload }: PayloadAction<number>) => {
      state.room_id = payload;
    },
    animationHandler: (state, { payload }: PayloadAction<boolean>) => {
      state.animating = payload;
    },
  },
});

export const roomSelector = (state: RootState) => state.room.room_id;
export const animationSelector = (state: RootState) => state.room.animating;

export const { roomNumberHandler, animationHandler } = reservations.actions;
export default reservations.reducer;
