export enum EPresetTimes {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  TEN_DAYS = DAY * 10,
}

export interface BasePaginatedRes {
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Participants {
  email: string;
  id: number;
}

export interface Reservations {
  room_id: number;
  date: string;
  from_time: string;
  to_time: string;
  title: string;
  description: string;
  participants: Participants[];
  id: number;
}
