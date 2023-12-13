import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { roomSelector, todaysEvents } from "src/redux/reducers/reservations";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import { Reservations } from "src/utils/types";
const today = new Date();

export const useReservations = ({ enabled = true }: { enabled?: boolean }) => {
  const dispatch = useAppDispatch();
  const room_id = useAppSelector(roomSelector);
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["reservations", room_id],
    queryFn: () =>
      apiClient
        .get("/app/meetings", { room_id, query_date: dayjs(today).format("YYYY-MM-DD") })
        .then(response => {
          dispatch(todaysEvents(response.data as Reservations[]));
          return response.data as Reservations[];
        }),
    enabled: !!room_id && enabled && !!token,
    refetchOnMount: true,
  });
};
export default useReservations;
