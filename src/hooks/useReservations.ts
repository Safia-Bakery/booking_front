import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { roomSelector } from "src/redux/reducers/reservations";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { Reservations } from "src/utils/types";
const today = new Date();

export const useReservations = ({
  enabled = true,
  query_date,
}: {
  enabled?: boolean;
  query_date?: string;
}) => {
  const { room_id } = useAppSelector(roomSelector);
  const token = useAppSelector(tokenSelector);

  return useQuery({
    queryKey: ["reservations", room_id, query_date],
    queryFn: () =>
      apiClient
        .get({
          url: query_date ? "/app/meetings" : "/app/all_meetings",
          params: { room_id, ...(!!query_date && { query_date }) },
        })
        .then(response => {
          return response.data as Reservations[];
        }),
    enabled: !!room_id && enabled && !!token,
  });
};
export default useReservations;
