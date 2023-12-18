import dayjs from "dayjs";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "src/components/Modal";
import Typography, { TextColor, TextSize, Weight } from "src/components/Typography";
import useReservation from "src/hooks/useReservation";
import Loading from "../Loader";
import Bullet from "../Bullet";
import deleteReservationMutation from "src/hooks/mutation/deleteReservationMutation";
import useReservations from "src/hooks/useReservations";
import { successToast } from "src/utils/toast";
import cl from "classnames";
import styles from "./index.module.scss";
import useQueryString from "src/hooks/custom/useQueryString";

const MeetingInfoModal = () => {
  const navigate = useNavigate();
  const id = useQueryString("id");
  const { data: event, isLoading, isFetching } = useReservation({ id: Number(id) });
  const { refetch } = useReservations({ enabled: false });

  const { mutate, isLoading: removing } = deleteReservationMutation();

  const handleDelete = () => {
    mutate(Number(id), {
      onSuccess: () => {
        refetch();
        successToast("Успешно удален");
        navigate("?");
      },
    });
  };

  const renderParticipants = useMemo(() => {
    if (event?.invited_users?.length)
      return event.invited_users?.map((item, idx) => (
        <Typography
          key={item + idx}
          size={TextSize.XL}
          weight={Weight.regular}
          textColor={TextColor.black}>
          {item}
        </Typography>
      ));
  }, [event?.invited_users]);

  return (
    <Modal
      isOpen={!!id}
      onClose={() => navigate("?")}
      className={cl("flex min-w-[300px] absolute w-full max-w-[400px]", styles.modal)}>
      {isLoading || isFetching || removing ? (
        <div className="flex absolute w-full h-full">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col p-4 min-w-[320px]  justify-between flex-1">
          <div className="flex flex-col max-h-[90%] overflow-y-auto flex-1">
            <div className="flex flex-wrap">
              <Typography
                className="mr-4"
                size={TextSize.XL}
                weight={Weight.bold}
                textColor={TextColor.black}>
                Организатор мероприятия:
              </Typography>
              <Typography size={TextSize.XL} weight={Weight.medium} textColor={TextColor.black}>
                {event?.organizer}
              </Typography>
            </div>
            <div className="flex flex-wrap">
              <Typography
                size={TextSize.XL}
                className="mr-4"
                weight={Weight.bold}
                textColor={TextColor.black}>
                Название мероприятия:
              </Typography>
              <Typography size={TextSize.XL} weight={Weight.medium} textColor={TextColor.black}>
                {event?.description}
              </Typography>
            </div>
            <div className="flex flex-wrap">
              <Typography
                size={TextSize.XL}
                className="mr-4"
                weight={Weight.bold}
                textColor={TextColor.black}>
                Начало:
              </Typography>
              <Typography size={TextSize.XL} weight={Weight.medium} textColor={TextColor.black}>
                {dayjs(event?.start_time).format("DD/MM/YYYY HH:mm")}
              </Typography>
            </div>
            <div className="flex flex-wrap">
              <Typography
                size={TextSize.XL}
                className="mr-4"
                weight={Weight.bold}
                textColor={TextColor.black}>
                Конец:
              </Typography>
              <Typography size={TextSize.XL} weight={Weight.medium} textColor={TextColor.black}>
                {dayjs(event?.end_time).format("DD/MM/YYYY HH:mm")}
              </Typography>
            </div>
            <div className="flex flex-wrap">
              <Typography
                size={TextSize.XL}
                className="mr-4"
                weight={Weight.bold}
                textColor={TextColor.black}>
                Конференц зал:
              </Typography>
              <Typography size={TextSize.XL} weight={Weight.medium} textColor={TextColor.black}>
                {event?.room_id}
              </Typography>
            </div>
            {!!event?.invited_users?.length && (
              <div className="flex items-start flex-col h-full flex-1">
                <Typography
                  size={TextSize.XL}
                  className="mr-4"
                  weight={Weight.bold}
                  textColor={TextColor.black}>
                  Участники:
                </Typography>
                <div className="flex flex-col items-start ">{renderParticipants}</div>
              </div>
            )}
          </div>
          <Bullet onClick={handleDelete} className="flex bg-red-400 h-[40px]">
            <img className="ml-auto !m-auto " src="/assets/icons/delete.svg" alt="delete" />
          </Bullet>
        </div>
      )}
    </Modal>
  );
};

export default MeetingInfoModal;
