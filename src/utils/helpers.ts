import { QueryClient } from "@tanstack/react-query";
import { EPresetTimes } from "./types";
import dayjs from "dayjs";

export const itemsPerPage = 20;

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
      cacheTime: EPresetTimes.MINUTE * 10,
      staleTime: EPresetTimes.MINUTE * 5,
    },
  },
});

export const parseTime = (timeString: string | null | undefined) => {
  return dayjs(timeString).format("YYYY-MM-DD HH:mm:ss");
};
