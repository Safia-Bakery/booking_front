import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";
import { AuthTypes } from "src/utils/types";

const tokenMutation = () => {
  return useMutation({
    mutationKey: ["post_token"],
    mutationFn: (body: { token: string }) =>
      apiClient.post({ url: "/auth/login", body }).then(({ data }) => data as AuthTypes),
    retry: 3,
    retryDelay: 1000,
    onError: (e: Error) => errorToast(e.message.toString()),
  });
};
export default tokenMutation;
