import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";

const deleteReservationMutation = () => {
  return useMutation(
    ["delete_reservation"],
    (id: string) =>
      apiClient
        .delete({
          url: `/app/meetings/${id}`,
        })
        .then(({ data }) => data),
    { onError: (e: Error) => errorToast(e.message.toString()) },
  );
};
export default deleteReservationMutation;
