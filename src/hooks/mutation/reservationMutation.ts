import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { roomSelector } from "src/redux/reducers/reservations";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";

interface BodyTypes {
  room_id?: number;
  organizer: number;
  invited_users?: string[];
  name?: string;
  description: string;
  start_time: string;
  end_time: string;
}

const reservationMutation = () => {
  const { room_id } = useAppSelector(roomSelector);
  return useMutation({
    mutationKey: ["post_reservation"],
    mutationFn: (body: BodyTypes) =>
      apiClient
        .post({
          url: "/app/meetings",
          body: { ...body, ...{ room_id } },
        })
        .then(data => data),
    retry: 3,
    retryDelay: 1000,
    onError: (e: Error) => errorToast(e.message.toString()),
  });
};
export default reservationMutation;
