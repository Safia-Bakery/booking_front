import { QueryClient } from "@tanstack/react-query";
import { EPresetTimes } from "./types";
import dayjs from "dayjs";

export const itemsPerPage = 20;

export const StatusName = [
  { name: "Активный", id: "1" },
  { name: "Не активный", id: "0" },
];
export const OrderTypeNames = [
  { name: "APC", id: "APC" },
  { name: "IT", id: "IT" },
];
export const UrgentNames = [
  { name: "Срочный", id: 1 },
  { name: "Несрочный", id: 2 },
];
export const RegionNames = [
  { name: "Uzbekistan", id: "Uzbekistan" },
  { name: "Kazakhstan", id: "Kazakhstan" },
];
export const CancelReason = [
  { name: "Do not needed", id: 1 },
  { name: "Exidently", id: 2 },
  { name: "Other", id: 3 },
];

export const numberWithCommas = (val: number) => {
  return val
    ?.toFixed(2)
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const fixedString = (value: string) => {
  return value
    .split("")
    .filter(item => {
      return [" ", "-", "(", ")"].indexOf(item) === -1;
    })
    .join("");
};

export const getKeyByValue = (object: any, value: any) => {
  return Object.keys(object).find(key => object[key] === value);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: EPresetTimes.MINUTE * 10,
      staleTime: EPresetTimes.MINUTE * 5,
    },
  },
});

export const parseTime = (timeString: string | null | undefined) => {
  return dayjs(timeString).format("YYYY-MM-DD HH:mm:ss");
};
