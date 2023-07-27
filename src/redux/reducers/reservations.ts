import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { MeTypes, Reservations, ValueLabel } from "src/utils/types";
import dayjs from "dayjs";

interface State {
  todaysEvents: Reservations[];
  me: MeTypes | undefined;
  emails: ValueLabel[];
}

const initialState: State = {
  todaysEvents: [],
  me: undefined,
  emails: [],
};

export const reservations = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    todaysEvents: (state, { payload }: PayloadAction<Reservations[]>) => {
      const filtered = payload.filter(
        reservation => reservation.date === dayjs(new Date()).format("YYYY-MM-DD"),
      );
      state.todaysEvents = filtered;
    },
    userEmails: (state, { payload }: PayloadAction<MeTypes>) => {
      const filtered = payload?.users?.map(item => ({
        value: item.Email,
        label: item.Email,
      }));
      state.emails = filtered;
      state.me = payload;
    },
  },
});

export const todaysEventsSelector = (state: RootState) => state.reservations.todaysEvents;
export const emailSelector = (state: RootState) => state.reservations.emails;

export const { todaysEvents, userEmails } = reservations.actions;
export default reservations.reducer;
