import Container from "src/components/Container";
import styles from "./index.module.scss";
import Typography, { TextColor, TextSize, Weight } from "src/components/Typography";
import calendar from "/assets/icons/calendar.svg";
import cl from "classnames";
import dayjs from "dayjs";
import BaseInput from "src/components/BaseInputs";
import { ChangeEvent, useEffect, useMemo } from "react";
import useReservations from "src/hooks/useReservations";
import isBetween from "dayjs/plugin/isBetween";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import {
  animationHandler,
  animationSelector,
  roomNumberHandler,
  roomSelector,
} from "src/redux/reducers/reservations";
import { Link, useNavigate } from "react-router-dom";
import MainSelect from "src/components/BaseInputs/MainSelect";
import Loading from "src/components/Loader";
import BookForm from "src/components/BookForm";
import BookModal from "src/components/BookModal";
import useInvitations from "src/hooks/useInvitations";
import { logoutHandler } from "src/redux/reducers/authReducer";

dayjs.extend(isBetween);
const roomArr = [
  { id: 1, name: "Конференц зал №1" },
  { id: 2, name: "Конференц зал №2" },
];

const today = new Date();

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: reservations, isLoading: reserveLoading, isError, error } = useReservations({});
  const room_id = useAppSelector(roomSelector);
  const animation = useAppSelector(animationSelector);

  const handleRooms = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(animationHandler(true));
    let key = e.target.value;
    setTimeout(() => {
      dispatch(roomNumberHandler(Number(key)));
      dispatch(animationHandler(false));
    }, 500);
  };

  useEffect(() => {
    if (isError || error) dispatch(logoutHandler());
  }, [isError, error]);

  const renderReservedTimes = useMemo(() => {
    return (
      <div className="flex flex-col items-start ml-3 h-60 overflow-y-auto pr-10">
        {reservations?.map(item => (
          <div key={item.id} className="cursor-pointer" onClick={() => navigate(`?id=${item.id}`)}>
            <Typography size={TextSize.L} weight={Weight.medium} textColor={TextColor.white}>
              {dayjs(item.start_time).format("HH:mm")} - {dayjs(item.end_time).format("HH:mm")} -{" "}
              {item.name}
            </Typography>
          </div>
        ))}
      </div>
    );
  }, [reservations, room_id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(animationHandler(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [animation]);

  // if (reserveLoading) return <Loading />;

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

        <div className="flex flex-col items-start ">
          <BaseInput className="mb-4">
            <MainSelect noDefault value={room_id} values={roomArr} onChange={handleRooms} />
          </BaseInput>
          <Typography
            className="mb-2 ml-1"
            size={TextSize.XXL}
            weight={Weight.medium}
            textColor={TextColor.white}>
            Забронированное время
          </Typography>
          {renderReservedTimes}
        </div>

        <BookForm />
      </div>

      <BookModal />
    </Container>
  );
};

export default Home;
