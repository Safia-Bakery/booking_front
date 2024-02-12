import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { errorToast } from "src/utils/toast";

const deleteReservationMutation = () => {
  return useMutation({
    mutationKey: ["delete_reservation"],
    mutationFn: (id: string) =>
      apiClient
        .delete({
          url: `/app/meetings/${id}`,
        })
        .then(({ data }) => data),
    retry: 3,
    retryDelay: 1000,
    onError: (e: Error) => errorToast(e.message.toString()),
  });
};
export default deleteReservationMutation;
