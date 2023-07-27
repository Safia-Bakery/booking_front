import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";
import { AuthTypes } from "src/utils/types";

const tokenMutation = () => {
  return useMutation(
    ["post_token"],
    (body: { code: string }) =>
      apiClient.post({ url: "/auth/google", body }).then(({ data }) => data as AuthTypes),
    { onError: (e: Error) => errorToast(e.message.toString()) },
  );
};
export default tokenMutation;
