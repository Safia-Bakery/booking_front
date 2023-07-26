import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";

interface LoginTypes {
  access_token: string;
  token_type: string;
  status_user: string;
  success: boolean;
}

const loginMutation = () => {
  return useMutation(
    ["login"],
    (body: { username: string; password: string }) =>
      apiClient
        .post({ url: "/login", body })
        .then(({ data }) => data as unknown as LoginTypes),
    { onError: (e: Error) => errorToast(e.toString()) }
  );
};
export default loginMutation;
