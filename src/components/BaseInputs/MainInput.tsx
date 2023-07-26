import { ChangeEvent, FC, HTMLInputTypeAttribute } from "react";
import cl from "classnames";
import styles from "./index.module.scss";

interface Props {
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  register?: Object;
}

const MainInput: FC<Props> = ({ className, placeholder = "", register, ...others }) => {
  return (
    <input
      className={cl(className, styles.input)}
      placeholder={placeholder || ""}
      {...register}
      {...others}
    />
  );
};

export default MainInput;
