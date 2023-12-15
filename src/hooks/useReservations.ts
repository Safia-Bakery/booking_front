import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { roomSelector } from "src/redux/reducers/reservations";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { Reservations } from "src/utils/types";
const today = new Date();

export const useReservations = ({ enabled = true }: { enabled?: boolean }) => {
  const room_id = useAppSelector(roomSelector);
  const token = useAppSelector(tokenSelector);

  return useQuery({
    queryKey: ["reservations", room_id],
    queryFn: () =>
      apiClient
        .get({
          url: "/app/meetings",
          params: { room_id, query_date: dayjs(today).format("YYYY-MM-DD") },
        })
        .then(response => {
          return response.data as Reservations[];
        }),
    enabled: !!room_id && enabled && !!token,
  });
};
export default useReservations;
