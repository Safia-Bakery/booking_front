import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { userEmails } from "src/redux/reducers/reservations";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";
import { MeTypes } from "src/utils/types";

export const useVerify = ({ enabled = true }: { enabled?: boolean }) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["verify"],
    queryFn: () =>
      apiClient
        .get("/verify", {
          token: tokens?.toString(),
          refresh_token: tokens?.toString(),
        })
        .then(({ data: response }: { data: any }) => {
          dispatch(userEmails(response as MeTypes));
          return response;
        })
        .catch((e: Error) => {
          errorToast(e.message);
          throw e;
        }),
    enabled,
    refetchOnMount: true,
  });
};

export default useVerify;
