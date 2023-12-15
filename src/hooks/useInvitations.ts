import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";
import { Reservations } from "src/utils/types";

export const useInvitations = ({ enabled = true }: { enabled?: boolean }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["app_invitations"],
    queryFn: () =>
      apiClient
        .get({ url: "/app/users" })
        .then(response => response.data as Reservations)
        .catch(error => {
          errorToast(error);
        }),
    enabled: enabled && !!token,
    refetchOnMount: true,
  });
};
export default useInvitations;
