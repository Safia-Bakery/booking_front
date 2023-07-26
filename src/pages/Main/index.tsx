import Container from "src/components/Container";
import styles from "./index.module.scss";
import Typography, { TextColor, TextSize, Weight } from "src/components/Typography";
import calendar from "/assets/icons/calendar.svg";
import cl from "classnames";
import dayjs from "dayjs";
import BaseInput from "src/components/BaseInputs";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import { ChangeEvent, useMemo, useState } from "react";
import Bullet from "src/components/Bullet";
import useReservations from "src/hooks/useReservations";
import Alert from "src/components/Alert";
import isBetween from "dayjs/plugin/isBetween";
import Modal from "src/components/Modal";
import MainInput from "src/components/BaseInputs/MainInput";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import { useForm } from "react-hook-form";
import Loading from "src/components/Loader";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import { todaysEventsSelector } from "src/redux/reducers/reservations";
import reservationMutation from "src/hooks/mutation/reservationMutation";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { successToast } from "src/utils/toast";
import { Link } from "react-router-dom";
import MainSelect from "src/components/BaseInputs/MainSelect";
import { roomNumberHandler, roomSelector } from "src/redux/reducers/room";

const roomArr = [
  { id: 1, name: "Conference Room #1" },
  { id: 2, name: "Conference Room #2" },
];

dayjs.extend(isBetween);

const Main = () => {
  const dispatch = useAppDispatch();
  const [startDate, $startDate] = useState<Date>(new Date());
  const [endDate, $endDate] = useState<Date | null>();
  const { data: reservations, isLoading: reserveLoading, refetch } = useReservations({});
  const [error, $error] = useState<string>();
  const todaysEvents = useAppSelector(todaysEventsSelector);
  const { mutate } = reservationMutation();
  const token = useAppSelector(tokenSelector);
  const room_id = useAppSelector(roomSelector);

  const [modal, $modal] = useState(false);

  const handleRooms = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(roomNumberHandler(Number(e.target.value)));

  const handleDateStart = (e: any) => $startDate(e);
  const handleDateEnd = (e: any) => $endDate(e);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = () => {
    const { title, description } = getValues();
    mutate(
      {
        room_id,
        from_time: startDate,
        to_time: endDate!,
        reservation_date: endDate!,
        participants: [],
        title,
        description,
        access_token: token!,
      },
      {
        onSuccess: () => {
          successToast("created");
          refetch();
          $modal(false);
        },
      },
    );
  };

  const handleValidation = () => {
    if (todaysEvents?.length)
      todaysEvents?.forEach(item => {
        if (
          dayjs(startDate).isBetween(dayjs(item.from_time), dayjs(item.to_time), null, "[]") ||
          dayjs(endDate).isBetween(dayjs(item.from_time), dayjs(item.to_time), null, "[]")
        ) {
          $error("This time range has already been reserved");
          return false;
        }
        // if (dayjs(startDate) > dayjs(endDate)) $error("Please select a valid time range");
        if (!endDate) $error("select end date");
        else {
          $modal(true);
          $error(undefined);
        }
      });
  };

  const renderReservedTimes = useMemo(() => {
    if (reservations?.length)
      return (
        <div className="flex flex-col items-start ml-3 max-h-60 overflow-y-auto pr-10">
          {reservations
            .filter(reservation => reservation.date === dayjs(new Date()).format("YYYY-MM-DD"))
            .map(item => (
              <Typography
                key={item.id}
                size={TextSize.L}
                weight={Weight.medium}
                textColor={TextColor.white}>
                {dayjs(item.from_time).format("HH:mm")} - {dayjs(item.to_time).format("HH:mm")} -{" "}
                {item.title}
              </Typography>
            ))}
        </div>
      );
  }, [reservations]);

  if (reserveLoading) return <Loading />;

  return (
    <Container className={styles.container}>
      <div className={cl("flex-col", "justify-between", "flex", "mb-6")}>
        <div className={cl("flex", "h-36")}>
          <Link to={"/calendar"}>
            <img src={calendar} className={styles.calendarIcon} alt="calendar-icon" />
          </Link>

          <div className={"flex justify-between flex-col items-start py-2"}>
            <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.white}>
              Today
            </Typography>
            <Typography size={TextSize.XXL} weight={Weight.medium} textColor={TextColor.white}>
              {dayjs(new Date()).format("dddd, MMMM-DD")}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col items-start ">
          {/* <Typography
            className="mb-4"
            size={TextSize.XXL}
            weight={Weight.medium}
            textColor={TextColor.white}>
            Conference Room #1
          </Typography> */}

          <BaseInput className="mb-4">
            <MainSelect value={room_id} values={roomArr} onChange={handleRooms} />
          </BaseInput>
          <Typography
            className="mb-2 ml-1"
            size={TextSize.XXL}
            weight={Weight.medium}
            textColor={TextColor.white}>
            Reserved Times
          </Typography>
          {renderReservedTimes}
        </div>

        <div className={styles.right}>
          <Typography
            className="mb-2"
            alignCenter
            size={TextSize.XXL}
            weight={Weight.medium}
            textColor={TextColor.white}>
            New reservation
          </Typography>

          <BaseInput label="start">
            <MainDatePicker
              minTime={dayjs(new Date()).toDate()}
              maxTime={dayjs().hour(20).minute(0).toDate()}
              selected={startDate}
              onChange={handleDateStart}
            />
          </BaseInput>
          <BaseInput label="end" className="mt-10">
            <MainDatePicker
              minTime={dayjs(startDate).add(10, "minute").toDate() || startDate}
              maxTime={dayjs().hour(20).minute(0).toDate()}
              selected={endDate}
              onChange={handleDateEnd}
            />
          </BaseInput>

          <Bullet onClick={handleValidation} className={styles.bullet}>
            reserve
          </Bullet>
          {error && <Alert error={error} />}
        </div>
      </div>

      <Modal isOpen={modal && !error} onClose={() => $modal(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 w-96">
          <BaseInput
            label="Title"
            labelClassName={"text-black"}
            className="mb-4"
            error={errors.title}>
            <MainInput
              className={"border-gray-400 text-gray-500"}
              register={register("title", { required: "Required field" })}
            />
          </BaseInput>

          <BaseInput
            label="Комментарии"
            labelClassName={"text-black"}
            className="mb-4"
            error={errors.description}>
            <MainTextArea
              className={"border-gray-400 text-gray-500"}
              register={register("description")}
            />
          </BaseInput>

          <BaseInput label="Participants" labelClassName={"text-black"}>
            <MainInput
              className={"border-gray-400 text-gray-500"}
              register={register("participants")}
            />
          </BaseInput>
          <Bullet className="mt-5 !border-gray-400" textColor={TextColor.gray} type="submit">
            Отправить
          </Bullet>
        </form>
      </Modal>
    </Container>
  );
};

export default Main;
