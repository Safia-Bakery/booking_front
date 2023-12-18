import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";
import { Reservations } from "src/utils/types";

export const useReservation = ({ id, enabled = true }: { enabled?: boolean; id: number }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: () =>
      apiClient
        .get({ url: `/app/meetings/${id}` })
        .then(response => response.data as Reservations)
        .catch(error => {
          errorToast(error);
        }),
    enabled: !!id && enabled && !!token,
    refetchOnMount: true,
  });
};
export default useReservation;
