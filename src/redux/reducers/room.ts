import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";

interface State {
  room_id: number;
}

const initialState: State = {
  room_id: 1,
};

export const reservations = createSlice({
  name: "room",
  initialState,
  reducers: {
    roomNumberHandler: (state, { payload }: PayloadAction<number>) => {
      state.room_id = payload;
    },
  },
});

export const roomSelector = (state: RootState) => state.room.room_id;

export const { roomNumberHandler } = reservations.actions;
export default reservations.reducer;
