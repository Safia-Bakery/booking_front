import { FC, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import cl from "classnames";
import styles from "./index.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

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
  return (
    <DatePicker
      onChange={onChange}
      selected={selected}
      timeFormat="p"
      dateFormat="Pp"
      readOnly
      open={select}
      showTimeSelect
      onClickOutside={() => $select(prev => !prev)}
      onInputClick={() => $select(prev => !prev)}
      timeIntervals={10}
      wrapperClassName="w-full"
      className={cl(styles.input, className)}
      {...register}
      {...others}
    />
  );
};

export default MainDatePicker;
