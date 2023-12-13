import dayjs from "dayjs";
import BaseInput from "../BaseInputs";
import MainDatePicker from "../BaseInputs/MainDatePicker";
import Typography, { TextColor, TextSize, Weight } from "../Typography";
import styles from "./index.module.scss";
import Alert from "../Alert";
import Bullet from "../Bullet";
import { useMemo, useState } from "react";
import cl from "classnames";
import { useNavigateParams, useRemoveParams } from "src/hooks/custom/useCustomNavigate";
import useQueryString from "src/hooks/custom/useQueryString";

const today = new Date();

const BookForm = () => {
  const startDate = useQueryString("startDate");
  const endDate = useQueryString("endDate");
  const [error, $error] = useState<string[]>();

  const removeParam = useRemoveParams();

  const handleRemoveParam = (item: string[]) => () => removeParam(item);

  const navigateParam = useNavigateParams();

  const handleDateStart = (e: any) => navigateParam({ startDate: e.toISOString() });
  const handleDateEnd = (e: any) => navigateParam({ endDate: e.toISOString() });

  const checkMinTime = useMemo(() => {
    if (!endDate) return dayjs(startDate).add(10, "minute").toDate();
    if (endDate)
      return dayjs(endDate).isSame(dayjs(startDate), "day")
        ? dayjs(startDate).add(10, "minute").toDate()
        : dayjs().hour(8).minute(0).toDate();
  }, [startDate, endDate]);

  return (
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
          onChange={handleDateStart}
          handleClear={handleRemoveParam(["startDate"])}
          selected={!!startDate && startDate !== "undefined" ? dayjs(startDate).toDate() : today}
        />
      </BaseInput>
      <BaseInput label="Конец" className="mt-6">
        <MainDatePicker
          minTime={checkMinTime}
          maxTime={dayjs().hour(20).minute(0).toDate()}
          selected={!!endDate && endDate !== "undefined" ? dayjs(endDate).toDate() : undefined}
          onChange={handleDateEnd}
          handleClear={handleRemoveParam(["endDate"])}
        />
      </BaseInput>

      <Bullet onClick={() => navigateParam({ modal: 1 })} className={cl(styles.bullet)}>
        Забронировать
      </Bullet>
      {!!error?.length && error?.map((item, idx) => <Alert error={item} key={item + idx} />)}
    </div>
  );
};

export default BookForm;
