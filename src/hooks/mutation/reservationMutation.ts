import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { roomSelector } from "src/redux/reducers/reservations";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";

interface BodyTypes {
  room_id: number;
  organized_by: number;
  invited_users?: string[];
  name?: string;
  description: string;
  start_time: string;
  end_time: string;
}

const reservationMutation = () => {
  const room_id = useAppSelector(roomSelector);
  const token = useAppSelector(tokenSelector);
  return useMutation(
    ["post_reservation"],
    (body: BodyTypes) =>
      apiClient
        .post({
          url: "/app/meetings",
          body: { ...body, ...{ room_id: room_id.toString(), access_token: token } },
        })
        .then(({ data }) => data),
    { onError: (e: Error) => errorToast(e.message.toString()) },
  );
};
export default reservationMutation;
