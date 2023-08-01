import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { MeTypes, Reservations, ValueLabel } from "src/utils/types";
import dayjs from "dayjs";

interface State {
  todaysEvents: { [key: number]: Reservations[] };
  me: MeTypes | undefined;
  emails: ValueLabel[];
  room_id: number;
  animating: boolean;
}

const initialState: State = {
  todaysEvents: [],
  me: undefined,
  emails: [],
  room_id: 1,
  animating: false,
};

export const reservations = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    todaysEvents: (state, { payload }: PayloadAction<Reservations[]>) => {
      const filtered = payload.filter(
        reservation => reservation.date === dayjs(new Date()).format("YYYY-MM-DD"),
      );
      state.todaysEvents[state.room_id] = filtered;
    },
    userEmails: (state, { payload }: PayloadAction<MeTypes>) => {
      const filtered = payload?.users?.map(item => ({
        value: item.Email,
        label: item.Email,
      }));
      state.emails = filtered;
      state.me = payload;
    },

    roomNumberHandler: (state, { payload }: PayloadAction<number>) => {
      state.room_id = payload;
    },
    animationHandler: (state, { payload }: PayloadAction<boolean>) => {
      state.animating = payload;
    },
  },
});

export const todaysEventsSelector = (state: RootState) =>
  state.reservations.todaysEvents[state.reservations.room_id];
export const emailSelector = (state: RootState) => state.reservations.emails;
export const roomSelector = (state: RootState) => state.reservations.room_id;
export const animationSelector = (state: RootState) => state.reservations.animating;

export const { todaysEvents, userEmails, roomNumberHandler, animationHandler } =
  reservations.actions;
export default reservations.reducer;
