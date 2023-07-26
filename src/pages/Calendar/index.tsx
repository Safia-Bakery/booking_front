import moment from "moment";
import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Event, Views, ToolbarProps } from "react-big-calendar";
import "moment/locale/ru";
import useReservations from "src/hooks/useReservations";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useReservation from "src/hooks/useReservation";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Modal from "src/components/Modal";
import Typography, { TextColor, TextSize, Weight } from "src/components/Typography";

import "moment/locale/ru";
import Bullet from "src/components/Bullet";
const localizer = momentLocalizer(moment);

interface MyEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const MyCustomToolbar: React.FC<ToolbarProps> = ({ label, onView, onNavigate }) => {
  return (
    <div className="flex py-3 px-2 justify-between">
      <div className="flex gap-4">
        <Bullet textColor={TextColor.black} onClick={() => onNavigate("TODAY")}>
          Сегодня
        </Bullet>
        <Bullet textColor={TextColor.black} onClick={() => onNavigate("PREV")}>
          Назад
        </Bullet>
        <Bullet textColor={TextColor.black} onClick={() => onNavigate("NEXT")}>
          Следующий
        </Bullet>
      </div>

      <Typography textColor={TextColor.black} weight={Weight.medium} size={TextSize.XXL}>
        {label}
      </Typography>

      <div className="flex gap-4">
        <Bullet className="flex" textColor={TextColor.black} onClick={() => onView(Views.MONTH)}>
          Месяц
        </Bullet>
        <Bullet textColor={TextColor.black} onClick={() => onView(Views.WEEK)}>
          Неделя
        </Bullet>
        <Bullet textColor={TextColor.black} onClick={() => onView(Views.DAY)}>
          День
        </Bullet>
        <Bullet textColor={TextColor.black} onClick={() => onView(Views.AGENDA)}>
          Повестка
        </Bullet>
      </div>
    </div>
  );
};

const EventComponent: React.FC<{ event: MyEvent }> = ({ event }) => {
  return <div>{event.title}</div>;
};

// moment.locale();

const CalendarScreen = () => {
  const { data: reservations, isLoading: reserveLoading } = useReservations({ all: true });
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const { data: event, refetch } = useReservation({ id: Number(id) });

  const handleSelectEvent = (event: MyEvent) => {
    navigate(`?id=${event.id}`);
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

  const events: MyEvent[] = useMemo(() => {
    if (reservations?.length)
      return reservations.map(item => ({
        id: item.id,
        title: item.title,
        start: dayjs(item.from_time).toDate(),
        end: dayjs(item.to_time).toDate(),
      }));

    return [];
  }, [reservations]);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot}
        views={["month", "week", "day", "agenda"]}
        components={{
          event: EventComponent,
          toolbar: MyCustomToolbar,
        }}
        className="bg-white"
        defaultView="month"
        style={{ height: "100vh", width: "100%" }}
      />

      <Modal isOpen={!!id} onClose={() => navigate("?")}>
        <div className="flex flex-col items-start p-4">
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
          <div className="flex items-start flex-col">
            <Typography size={TextSize.XXL} weight={Weight.bold} textColor={TextColor.black}>
              Participants:
            </Typography>
            <div className="flex flex-col items-start">{renderParticipants}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarScreen;
