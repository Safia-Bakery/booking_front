import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { Reservations } from "src/utils/types";
import dayjs from "dayjs";

interface State {
  todaysEvents: Reservations[];
}

const initialState: State = {
  todaysEvents: [],
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
  },
});

export const todaysEventsSelector = (state: RootState) => state.reservations.todaysEvents;

export const { todaysEvents } = reservations.actions;
export default reservations.reducer;
