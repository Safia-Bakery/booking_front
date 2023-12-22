import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";
import { Reservations, Users } from "src/utils/types";

export const useUsers = ({ id, enabled = true }: { enabled?: boolean; id: number }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["users", id],
    queryFn: () =>
      apiClient
        .get({ url: `/app/users` })
        .then(response => response.data as Users[])
        .catch(error => {
          errorToast(error);
        }),
    enabled: !!id && enabled && !!token,
    refetchOnMount: true,
  });
};
export default useUsers;
