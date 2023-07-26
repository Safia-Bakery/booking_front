import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { todaysEvents } from "src/redux/reducers/reservations";
import { roomSelector } from "src/redux/reducers/room";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import { Reservations } from "src/utils/types";

export const useReservations = ({ enabled = true, all }: { enabled?: boolean; all?: boolean }) => {
  const dispatch = useAppDispatch();
  const room_id = useAppSelector(roomSelector);
  return useQuery({
    queryKey: ["reservations", room_id, all],
    queryFn: () =>
      apiClient.get(`/reservations`, { room_id, all }).then(response => {
        dispatch(todaysEvents(response.data as Reservations[]));
        return response.data as Reservations[];
      }),
    enabled: !!room_id && enabled,
    refetchOnMount: true,
  });
};
export default useReservations;
