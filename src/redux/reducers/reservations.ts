import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { MeTypes, Reservations, ValueLabel } from "src/utils/types";
import { baseURL } from "src/api/base_url";

interface State {
  todaysEvents: { [key: number]: Reservations[] };
  me: MeTypes | undefined;
  emails: ValueLabel[];
  room_id: number;
  animating: boolean;
  room_img?: string;
}

const initialState: State = {
  todaysEvents: [],
  me: undefined,
  emails: [],
  room_id: 0,
  animating: false,
  room_img: `${baseURL}/files/bg1.JPG`,
};

export const reservations = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    roomHandler: (state, { payload }: PayloadAction<{ room_id: number; room_img?: string }>) => {
      state.room_id = +payload.room_id;
      state.room_img = `${baseURL}/${payload.room_img}`;
    },
    animationHandler: (state, { payload }: PayloadAction<boolean>) => {
      state.animating = payload;
    },
  },
});

export const todaysEventsSelector = (state: RootState) =>
  state.reservations.todaysEvents[state.reservations.room_id];
export const emailSelector = (state: RootState) => state.reservations.emails;
export const roomSelector = (state: RootState) => state.reservations;
export const animationSelector = (state: RootState) => state.reservations.animating;

export const { roomHandler, animationHandler } = reservations.actions;
export default reservations.reducer;
