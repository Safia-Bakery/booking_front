import { FC, useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import cl from "classnames";
import styles from "./index.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import dayjs from "dayjs";

registerLocale("ru", ru);
setDefaultLocale("ru");

interface Props {
  onChange?: any;
  className?: string;
  value?: string;
  disabled?: boolean;
  register?: Object;
  selected?: Date | null | undefined;
  minDate?: Date | null;
  maxDate?: Date | null;
  maxTime?: Date;
  minTime?: Date;
}

const MainDatePicker: FC<Props> = ({ className, selected, register, onChange, ...others }) => {
  const [select, $select] = useState(false);

  const toggler = () => $select(prev => !prev);
  const selectedTime = dayjs(selected).format("HH:mm:ss");

  useEffect(() => {
    if (selected) $select(false);
  }, [selectedTime]);

  return (
    <DatePicker
      onChange={onChange}
      selected={selected}
      timeFormat="p"
      shouldCloseOnSelect
      dateFormat="Pp"
      readOnly
      open={select}
      showTimeSelect
      onClickOutside={toggler}
      timeCaption="Время"
      onInputClick={toggler}
      timeIntervals={10}
      wrapperClassName="w-full"
      className={cl(styles.input, className)}
      {...register}
      {...others}
    />
  );
};

export default MainDatePicker;
