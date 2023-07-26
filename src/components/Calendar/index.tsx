import React, { useMemo } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/ru";
import useReservations from "src/hooks/useReservations";

interface MyEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const EventComponent: React.FC<{ event: MyEvent }> = ({ event }) => {
  return <div>{event.title}</div>;
};

const MyCalendar: React.FC = () => {
  const { data: reservations } = useReservations({ room_id: 1 });

  moment.locale();

  const localizer = momentLocalizer(moment);

  const mapReserves = useMemo(() => {
    const edited = reservations?.map(reservation => ({
      id: reservation.id,
      title: reservation.title,
      start: new Date(reservation.from_time),
      end: new Date(reservation.to_time),
    }));

    return edited;
  }, []);

  return (
    <Calendar
      localizer={localizer}
      events={mapReserves}
      startAccessor="start"
      endAccessor="end"
      views={["month", "week", "day", "agenda"]}
      components={{
        event: EventComponent,
      }}
      defaultView="month"
      style={{ height: "500px" }}
      selectable
    />
  );
};

export default MyCalendar;
