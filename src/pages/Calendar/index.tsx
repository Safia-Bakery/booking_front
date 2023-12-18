import moment from "moment";
import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Event, Views, ToolbarProps } from "react-big-calendar";
import "moment/locale/ru";
import useReservations from "src/hooks/useReservations";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
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
        <Bullet
          className="bg-mainGray"
          textColor={TextColor.black}
          onClick={() => onNavigate("TODAY")}>
          Сегодня
        </Bullet>
        <Bullet
          className="bg-mainGray"
          textColor={TextColor.black}
          onClick={() => onNavigate("PREV")}>
          Назад
        </Bullet>
        <Bullet
          className="bg-mainGray"
          textColor={TextColor.black}
          onClick={() => onNavigate("NEXT")}>
          Следующий
        </Bullet>
      </div>

      <Typography textColor={TextColor.black} weight={Weight.medium} size={TextSize.XXL}>
        {label}
      </Typography>

      <div className="flex gap-4">
        <Bullet
          className="bg-mainGray"
          textColor={TextColor.black}
          onClick={() => onView(Views.MONTH)}>
          Месяц
        </Bullet>
        <Bullet
          className="bg-mainGray"
          textColor={TextColor.black}
          onClick={() => onView(Views.WEEK)}>
          Неделя
        </Bullet>
        <Bullet
          className="bg-mainGray"
          textColor={TextColor.black}
          onClick={() => onView(Views.DAY)}>
          День
        </Bullet>
        <Bullet
          className="bg-mainGray"
          textColor={TextColor.black}
          onClick={() => onView(Views.AGENDA)}>
          Повестка
        </Bullet>
        <Link to="/">
          <Bullet className="w-16 bg-sky-600 self-end">Домой</Bullet>
        </Link>
      </div>
    </div>
  );
};

const EventComponent: React.FC<{ event: MyEvent }> = ({ event }) => {
  return <div>{event.title}</div>;
};

const CalendarScreen = () => {
  const { data: reservations, isLoading: reserveLoading } = useReservations({});
  const navigate = useNavigate();

  const handleSelectEvent = (event: MyEvent) => {
    navigate(`?id=${event.id}`);
  };

  const events: MyEvent[] = useMemo(() => {
    if (reservations?.length)
      return reservations.map(item => ({
        id: item.id,
        title: item.organizer,
        start: dayjs(item.start_time).toDate(),
        end: dayjs(item.end_time).toDate(),
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
        components={{
          event: EventComponent,
          toolbar: MyCustomToolbar,
        }}
        className="bg-white"
        defaultView="month"
        style={{ height: "100vh", width: "100%", overflow: "auto", backgroundColor: "gray" }}
      />
    </div>
  );
};

export default CalendarScreen;
