import { useMutation } from "@tanstack/react-query";
import { apiClient } from "src/main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { roomSelector } from "src/redux/reducers/room";
import { useAppSelector } from "src/redux/reduxUtils/types";
import { errorToast } from "src/utils/toast";

interface BodyTypes {
  room_id?: number | string;
  from_time: Date | string;
  to_time: Date | string;
  reservation_date?: Date | String;
  participants: string[];
  title: string;
  description: string;
  access_token?: string;
}

const reservationMutation = () => {
  const room_id = useAppSelector(roomSelector);
  const token = useAppSelector(tokenSelector);
  return useMutation(
    ["post_reservation"],
    (body: BodyTypes) =>
      apiClient
        .post({
          url: "/reservations",
          body: { ...body, ...{ room_id: room_id.toString(), access_token: token } },
        })
        .then(({ data }) => data),
    { onError: (e: Error) => errorToast(e.message.toString()) },
  );
};
export default reservationMutation;
