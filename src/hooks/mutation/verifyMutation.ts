import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";

interface Body {
  access_token: string;
  client_id: string;
  refresh_token: string;
  client_secret: string;
}

const verifyMutation = () => {
  return useMutation(
    ["verification"],
    (body: Body) => apiClient.post({ url: "/verify", body }).then(data => data),
    { onError: (e: Error) => errorToast(e.message.toString()) },
  );
};
export default verifyMutation;
