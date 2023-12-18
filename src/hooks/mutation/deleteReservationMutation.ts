import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";

const deleteReservationMutation = () => {
  const token = useAppSelector(tokenSelector);
  return useMutation(
    ["delete_reservation"],
    (id: number) =>
      apiClient
        .delete({
          url: `/app/meetings/${id}`,
          params: { token },
        })
        .then(({ data }) => data),
    { onError: (e: Error) => errorToast(e.message.toString()) },
  );
};
export default deleteReservationMutation;
