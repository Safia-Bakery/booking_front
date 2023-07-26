import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";

interface LoginTypes {
  access_token: string;
  client_id: string;
  refresh_token: string;
  client_secret: string;
}

const loginMutation = () => {
  return useMutation(
    ["login"],
    (body: { username: string; password: string }) =>
      apiClient
        .post({ url: "/user/emails", body })
        .then(({ data }) => data as unknown as LoginTypes),
    { onError: (e: Error) => errorToast(e.toString()) },
  );
};
export default loginMutation;
