import { FC, useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import cl from "classnames";
import styles from "./index.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import dayjs from "dayjs";
import { UseFormRegisterReturn } from "react-hook-form";

registerLocale("ru", ru);
setDefaultLocale("ru");

interface Props {
  onChange?: any;
  className?: string;
  wrapperClassName?: string;
  value?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  selected?: Date | null | undefined;
  filter?: boolean;
  showTimeSelect?: boolean;
  iconClassName?: string;
  dateFormat?: string;
  others?: any;
  minDate?: Date | null;
  maxDate?: Date | null;
  maxTime?: Date;
  minTime?: Date;
  handleClear?: () => void;
}

const MainDatePicker: FC<Props> = ({
  className,
  selected,
  register,
  onChange,
  wrapperClassName,
  showTimeSelect,
  iconClassName,
  dateFormat = "d.MM.yyyy HH:mm",
  others,
  handleClear,
}) => {
  const [select, $select] = useState(false);

  const toggler = () => $select(prev => !prev);
  const selectedTime = dayjs(selected).format("HH:mm:ss");

  useEffect(() => {
    if (selected) $select(false);
  }, [selectedTime]);

  return (
    <div className={cl(wrapperClassName, "relative w-full")}>
      <DatePicker
        onChange={onChange}
        selected={selected}
        dateFormat={dateFormat}
        showTimeSelect={showTimeSelect}
        timeFormat="p"
        shouldCloseOnSelect
        readOnly
        open={select}
        onClickOutside={toggler}
        timeCaption="Время"
        onInputClick={toggler}
        timeIntervals={10}
        wrapperClassName="w-full"
        className={cl(styles.input, className)}
        {...register}
        {...others}
      />

      {!!selected && (
        <img
          onClick={handleClear}
          src="/assets/icons/clear.svg"
          alt="clear"
          width={15}
          height={15}
          className={cl(iconClassName, "absolute right-4 top-1/2 z-20 -translate-y-1/2")}
        />
      )}
    </div>
  );
};

export default MainDatePicker;
