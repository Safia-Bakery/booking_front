import Container from "src/components/Container";
import styles from "./index.module.scss";
import Typography, { TextColor, TextSize, Weight } from "src/components/Typography";
import calendar from "/assets/icons/calendar.svg";
import cl from "classnames";
import dayjs from "dayjs";
import BaseInput from "src/components/BaseInputs";
import MainDatePicker from "src/components/BaseInputs/MainDatePicker";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Bullet from "src/components/Bullet";
import useReservations from "src/hooks/useReservations";
import Alert from "src/components/Alert";
import isBetween from "dayjs/plugin/isBetween";
import Modal from "src/components/Modal";
import MainInput from "src/components/BaseInputs/MainInput";
import MainTextArea from "src/components/BaseInputs/MainTextArea";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import {
  animationHandler,
  animationSelector,
  emailSelector,
  roomNumberHandler,
  roomSelector,
  todaysEventsSelector,
} from "src/redux/reducers/reservations";
import reservationMutation from "src/hooks/mutation/reservationMutation";
import { successToast } from "src/utils/toast";
import { Link, useNavigate } from "react-router-dom";
import MainSelect from "src/components/BaseInputs/MainSelect";
import { ActionMeta, MultiValue } from "react-select";
import { ValueLabel } from "src/utils/types";
import MultiSelect from "src/components/BaseInputs/MultiSelect";
import Loading from "src/components/Loader";

dayjs.extend(isBetween);
const roomArr = [
  { id: 1, name: "Конференц зал #1" },
  { id: 2, name: "Конференц зал #2" },
];

const today = new Date();

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [startDate, $startDate] = useState<Date>(today);
  const [endDate, $endDate] = useState<Date | null>();
  const { data: reservations, refetch, isLoading: reserveLoading } = useReservations({});
  const [error, $error] = useState<string>();
  const todaysEvents = useAppSelector(todaysEventsSelector);
  const { mutate, isLoading: mutateLoading } = reservationMutation();
  const room_id = useAppSelector(roomSelector);
  const [selectedEmails, $selectedEmails] = useState<string[]>([]);
  const userEmails = useAppSelector(emailSelector);
  const animation = useAppSelector(animationSelector);

  const [modal, $modal] = useState(false);

  const handleRooms = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(animationHandler(true));
    let key = e.target.value;
    setTimeout(() => {
      dispatch(roomNumberHandler(Number(key)));
      dispatch(animationHandler(false));
    }, 500);
  };

  const handleDateStart = (e: any) => $startDate(e);
  const handleDateEnd = (e: any) => $endDate(e);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = () => {
    const { title, description } = getValues();
    mutate(
      {
        from_time: startDate,
        to_time: endDate!,
        reservation_date: endDate!,
        participants: selectedEmails,
        title,
        description,
      },
      {
        onSuccess: () => {
          successToast("Успешно забронировано");
          refetch();
          reset();
          $modal(false);
          $startDate(today);
          $endDate(undefined);
          $selectedEmails([]);
        },
      },
    );
  };

  const handleValidation = () => {
    if (todaysEvents?.length)
      todaysEvents?.forEach(item => {
        if (
          dayjs(startDate).isBetween(dayjs(item.from_time), dayjs(item.to_time), null, "[]") ||
          dayjs(endDate).isBetween(dayjs(item.from_time), dayjs(item.to_time), null, "[]") ||
          dayjs(item.from_time).isBetween(
            dayjs(startDate?.toISOString()),
            dayjs(endDate?.toISOString()),
            null,
            "[]",
          ) ||
          dayjs(item.to_time).isBetween(
            dayjs(startDate?.toISOString()),
            dayjs(endDate?.toISOString()),
            null,
            "[]",
          )
        ) {
          $error("Этот временной диапазон уже зарезервирован");
          return false;
        }
        if (dayjs(endDate).isBefore(dayjs(startDate))) {
          $error("Выберите правильный диапазон");
          return false;
        }
        if (!endDate) $error("Выберите время заканчивания");
        else {
          $modal(true);
          $error(undefined);
        }
      });
    else {
      if (dayjs(endDate).isBefore(dayjs(startDate))) {
        $error("Выберите правильный диапазон");
        return false;
      }
      if (!endDate) $error("select end date");
      else return $modal(true);
    }
  };

  const renderReservedTimes = useMemo(() => {
    return (
      <div className="flex flex-col items-start ml-3 h-60 overflow-y-auto pr-10">
        {reservations
          ?.filter(reservation => reservation.date === dayjs(today).format("YYYY-MM-DD"))
          .map(item => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => navigate(`?id=${item.id}`)}>
              <Typography size={TextSize.L} weight={Weight.medium} textColor={TextColor.white}>
                {dayjs(item.from_time).format("HH:mm")} - {dayjs(item.to_time).format("HH:mm")} -{" "}
                {item.title}
              </Typography>
            </div>
          ))}
      </div>
    );
  }, [reservations, room_id]);

  const handleEmails = (e: MultiValue<ValueLabel>, item: ActionMeta<ValueLabel>) => {
    if (item.removedValue) $selectedEmails(e.map(item => item.value));
    if (item?.option) $selectedEmails([...selectedEmails, item.option.value]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(animationHandler(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [animation]);

  if (reserveLoading || mutateLoading) return <Loading />;

  return (
    <Container className={styles.container}>
      <div className={cl("flex-col", "justify-between", "flex", "mb-6")}>
        <div className={cl("flex", "h-36")}>
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

        <div className={styles.right}>
          <Typography
            className="mb-2"
            alignCenter
            size={TextSize.XXL}
            weight={Weight.medium}
            textColor={TextColor.white}>
            Новое мероприятие
          </Typography>

          <BaseInput label="Начало">
            <MainDatePicker
              minTime={dayjs(today).toDate()}
              maxTime={dayjs().hour(20).minute(0).toDate()}
              selected={startDate}
              onChange={handleDateStart}
            />
          </BaseInput>
          <BaseInput label="Конец" className="mt-10">
            <MainDatePicker
              minTime={dayjs(startDate).add(10, "minute").toDate() || startDate}
              maxTime={dayjs().hour(20).minute(0).toDate()}
              selected={endDate}
              onChange={handleDateEnd}
            />
          </BaseInput>

          <Bullet onClick={handleValidation} className={styles.bullet}>
            Забронировать
          </Bullet>
          {error && <Alert error={error} />}
        </div>
      </div>

      <Modal isOpen={modal && !error} onClose={() => $modal(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 w-96">
          <BaseInput
            label="Название"
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

          <BaseInput label="Участники" labelClassName={"text-black"}>
            <MultiSelect onChange={handleEmails} options={userEmails} />
          </BaseInput>
          <Bullet className="mt-5 !border-gray-400" textColor={TextColor.gray} type="submit">
            Отправить
          </Bullet>
        </form>
      </Modal>
    </Container>
  );
};

export default Home;
