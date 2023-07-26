import { FC } from "react";
import DatePicker from "react-datepicker";
import cl from "classnames";
import styles from "./index.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

// import "./datePickerStyles.css";

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
  return (
    <DatePicker
      onChange={onChange}
      selected={selected}
      timeFormat="p"
      dateFormat="Pp"
      showTimeSelect
      timeIntervals={10}
      wrapperClassName="w-full"
      className={cl(styles.input, className)}
      {...register}
      {...others}
    />
  );
};

export default MainDatePicker;
