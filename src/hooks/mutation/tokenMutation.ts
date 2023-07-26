import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";

const tokenMutation = () => {
  return useMutation(
    ["post_token"],
    (body: { code: string }) => apiClient.post({ url: "/auth/google", body }).then(data => data),
    { onError: (e: Error) => errorToast(e.message.toString()) },
  );
};
export default tokenMutation;
