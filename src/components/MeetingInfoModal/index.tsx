import dayjs from "dayjs";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const MeetingInfoModal = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("id");
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
    if (event?.participants.length)
      return event.participants.map(item => (
        <Typography
          key={item.id}
          size={TextSize.XXL}
          weight={Weight.regular}
          textColor={TextColor.black}>
          {item.email}
        </Typography>
      ));
  }, [event?.participants]);

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
        <div className="flex flex-col p-4 min-w-[300px]  justify-between flex-1">
          <div className="flex flex-col max-h-[90%] overflow-y-auto flex-1">
            <div className="flex flex-wrap">
              <Typography
                className="mr-4"
                size={TextSize.XXL}
                weight={Weight.bold}
                textColor={TextColor.black}>
                Название:
              </Typography>
              <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.black}>
                {event?.title}
              </Typography>
            </div>
            <div className="flex flex-wrap">
              <Typography
                size={TextSize.XXL}
                className="mr-4"
                weight={Weight.bold}
                textColor={TextColor.black}>
                Описание:
              </Typography>
              <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.black}>
                {event?.description}
              </Typography>
            </div>
            <div className="flex flex-wrap">
              <Typography
                size={TextSize.XXL}
                className="mr-4"
                weight={Weight.bold}
                textColor={TextColor.black}>
                Начало:
              </Typography>
              <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.black}>
                {dayjs(event?.from_time).format("DD/MM/YYYY HH:mm")}
              </Typography>
            </div>
            <div className="flex flex-wrap">
              <Typography
                size={TextSize.XXL}
                className="mr-4"
                weight={Weight.bold}
                textColor={TextColor.black}>
                Конец:
              </Typography>
              <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.black}>
                {dayjs(event?.to_time).format("DD/MM/YYYY HH:mm")}
              </Typography>
            </div>
            {!!event?.participants.length && (
              <div className="flex items-start flex-col h-full flex-1">
                <Typography
                  size={TextSize.XXL}
                  className="mr-4"
                  weight={Weight.bold}
                  textColor={TextColor.black}>
                  Участники:
                </Typography>
                <div className="flex flex-col items-start ">{renderParticipants}</div>
                {/* <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div>
                <div className="flex flex-col items-start">{renderParticipants}</div> */}
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
