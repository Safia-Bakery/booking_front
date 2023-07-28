import { useQuery } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { userEmails } from "src/redux/reducers/reservations";
import { useAppDispatch } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";
import { AuthTypes, MeTypes } from "src/utils/types";

export const useVerify = ({
  body,
  enabled = true,
}: {
  enabled?: boolean;
  body: AuthTypes | null;
}) => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["verify"],
    queryFn: () =>
      apiClient
        .get("/verify", {
          token: body?.token.toString(),
          refresh_token: body?.refresh_token.toString(),
        })
        .then(({ data: response }) => {
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
