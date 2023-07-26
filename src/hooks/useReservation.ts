import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";
import { Reservations } from "src/utils/types";

export const useReservation = ({ id, enabled = true }: { enabled?: boolean; id: number }) => {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: () =>
      apiClient
        .get(`/reservations/${id}`)
        .then(response => response.data as Reservations)
        .catch(error => {
          errorToast(error);
        }),
    enabled: !!id && enabled,
    refetchOnMount: true,
  });
};
export default useReservation;
