import dayjs from "dayjs";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "src/components/Modal";
import Typography, { TextColor, TextSize, Weight } from "src/components/Typography";
import useReservation from "src/hooks/useReservation";
import Loading from "../Loader";

const MeetingInfoModal = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("id");
  const { data: event, refetch, isLoading, isFetching } = useReservation({ id: Number(id) });

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
      className="flex min-w-[300px] absolute w-full min-h-[500px]">
      {isLoading || isFetching ? (
        <div className="flex max-w-[300px] absolute w-full max-h-[500px] h-full">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col items-start p-4 min-w-[300px]">
          <div className="flex gap-4">
            <Typography size={TextSize.XXL} weight={Weight.bold} textColor={TextColor.black}>
              Title:
            </Typography>
            <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.black}>
              {event?.title}
            </Typography>
          </div>
          <div className="flex gap-4">
            <Typography size={TextSize.XXL} weight={Weight.bold} textColor={TextColor.black}>
              Description:
            </Typography>
            <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.black}>
              {event?.description}
            </Typography>
          </div>
          <div className="flex gap-4">
            <Typography size={TextSize.XXL} weight={Weight.bold} textColor={TextColor.black}>
              Starts:
            </Typography>
            <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.black}>
              {dayjs(event?.from_time).format("DD/MM/YYYY HH:mm")}
            </Typography>
          </div>
          <div className="flex gap-4">
            <Typography size={TextSize.XXL} weight={Weight.bold} textColor={TextColor.black}>
              Ends:
            </Typography>
            <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.black}>
              {dayjs(event?.to_time).format("DD/MM/YYYY HH:mm")}
            </Typography>
          </div>
          {event?.participants.length && (
            <div className="flex items-start flex-col">
              <Typography size={TextSize.XXL} weight={Weight.bold} textColor={TextColor.black}>
                Participants:
              </Typography>
              <div className="flex flex-col items-start">{renderParticipants}</div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default MeetingInfoModal;