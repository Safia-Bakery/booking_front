import cl from "classnames";
import { FC } from "react";
import styles from "./index.module.scss";
import Select, { useCreatable } from "react-select/creatable";

interface Props {
  onChange?: (val: any, item?: any) => void;
  className?: string;
  value?: string;
  placeholder?: string | null;
  disabled?: boolean;
  options: any;
}
const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: "white",
    borderRadius: 4,
    borderColor: state.isFocused ? "black" : "gray",
    "&:hover": {
      borderColor: "gray",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    background: "gray",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: !state.isFocused ? "white" : "black",
    background: state.isFocused ? "#e5e5e5" : "gray",
    "&:active": {
      color: "white",
      background: "#e5e5e5",
    },
  }),
};

const MultiSelect: FC<Props> = ({ onChange, options, className, ...others }) => {
  return (
    <Select
      className={cl(className, styles.input, "!p-0")}
      closeMenuOnSelect
      onChange={onChange}
      options={options}
      isMulti
      styles={customStyles}
      {...others}
    />
  );
};

export default MultiSelect;
