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

export interface EmailTypes {
  Email: string;
  Name?: string;
}

export interface Participants {
  email: string;
  id: number;
}

export interface ValueLabel {
  value: string;
  label: string;
}

export interface Reservations {
  id: number;
  room_id: number;
  created_by: string;
  organizer: string;
  invited_users: string[];
  name: string;
  description: string;
  start_time: string;
  end_time: string;
}

export interface MeTypes {
  users: EmailTypes[];
}
export interface AuthTypes {
  email: string;
  jwt_token: string;
  token_type: string;
}
export interface VerifyTypes {
  users: EmailTypes[];
  access_token?: string;
}

export interface RoomTypes {
  id: number;
  name: string;
}
