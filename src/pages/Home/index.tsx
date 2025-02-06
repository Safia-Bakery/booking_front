import Container from "src/components/Container";
import styles from "./index.module.scss";
import Typography, { TextColor, TextSize, Weight } from "src/components/Typography";
import calendar from "/assets/icons/calendar.svg";
import dayjs from "dayjs";
import BaseInput from "src/components/BaseInputs";
import { ChangeEvent, useEffect, useMemo } from "react";
import useReservations from "src/hooks/useReservations";
import isBetween from "dayjs/plugin/isBetween";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import {
  animationHandler,
  animationSelector,
  roomHandler,
  roomSelector,
} from "src/redux/reducers/reservations";
import { Link, useNavigate } from "react-router-dom";
import MainSelect from "src/components/BaseInputs/MainSelect";
import BookForm from "src/components/BookForm";
import BookModal from "src/components/BookModal";
import { logoutHandler } from "src/redux/reducers/authReducer";
import useRooms from "src/hooks/useRooms";
import Loading from "src/components/Loader";

dayjs.extend(isBetween);

const today = new Date();

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: reservations,
    isLoading: reserveLoading,
    isError,
    error,
  } = useReservations({ query_date: dayjs(today).format("YYYY-MM-DD") });
  const { room_id } = useAppSelector(roomSelector);
  const animation = useAppSelector(animationSelector);

  const { data: rooms, isLoading: roomsLoading } = useRooms({});

  const handleRooms = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(animationHandler(true));
    const room_id = e.target.value;
    const room_img = rooms?.find(room => room.id === +room_id)?.image;
    setTimeout(() => {
      dispatch(roomHandler({ room_id: Number(room_id), room_img }));
      dispatch(animationHandler(false));
    }, 500);
  };

  useEffect(() => {
    if (isError || error) dispatch(logoutHandler());
  }, [isError, error]);

  const renderReservedTimes = useMemo(() => {
    return (
      <div className=" flex max-w-[1090px] items-start ml-3  overflow-y-auto pr-10 gap-14">
        {reservations?.map(item => {
          const active = dayjs(item.end_time).isBefore(new Date());
          return (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => navigate(`?id=${item.id}`)}>
              <Typography
                className="text-[40px]"
                size={TextSize.welcome}
                weight={Weight.medium}
                textColor={active ? TextColor.red : TextColor.green}>
                <div>{dayjs(item.start_time).format("HH:mm")}</div>
                <div>{dayjs(item.end_time).format("HH:mm")}</div>
              </Typography>
            </div>
          );
        })}
      </div>
    );
  }, [reservations, room_id]);

  const renderRooms = useMemo(() => {
    if (rooms)
      return (
        <BaseInput>
          <MainSelect
            className="text-6xl"
            noDefault
            value={room_id}
            values={rooms}
            onChange={handleRooms}
          />
        </BaseInput>
      );
  }, [rooms, room_id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(animationHandler(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [animation]);

  return (
    <Container className={styles.container}>
      <div className={"flex-col justify-between flex mb-6"}>
        <div className={"flex h-36"}>
          <Link to={"/calendar"}>
            <img src={calendar} className={styles.calendarIcon} alt="calendar-icon" />
          </Link>

          <div className={"flex justify-between flex-col items-start py-2"}>
            <Typography size={TextSize.XXL} weight={Weight.bold} textColor={TextColor.white}>
              Сегодня
            </Typography>
            <Typography size={TextSize.fourty} weight={Weight.medium} textColor={TextColor.white}>
              {dayjs(today).format("dddd, MMMM-DD")}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col items-start pt-[360px]">
          {renderRooms}
          <Typography
            className="mb-2 ml-1 text-[40px] "
            size={TextSize.welcome}
            weight={Weight.semiBold}
            textColor={TextColor.white}>
            Забронированное время
          </Typography>
          {renderReservedTimes}
        </div>

        <BookForm />
      </div>

      <BookModal />
      {(reserveLoading || roomsLoading) && <Loading absolute />}
    </Container>
  );
};

export default Home;
