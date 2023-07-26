import clx from "classnames";
import { FC, ReactNode } from "react";
import styles from "./index.module.scss";

export enum TextColor {
  primary = "primary",
  secondary = "secondary",
  white = "white",
  black = "black",
  blue = "blue",
  gray = "gray",
  textColor = "textColor",
  lightBlue = "lightBlue",
  yellow = "yellow",
  red = "red",
  green = "green",
}
export enum TextSize {
  XXL = "xxl",
  XL = "xl",
  L = "l",
  M = "m",
  S = "s",
  XS = "xs",
  welcome = "welcome",
  sixty = "sixty",
  hundredTwelve = "hundredTwelve",
  thirty = "thirty",
  eight = "eight",
}

export enum Weight {
  regular = "regular",
  semiBold = "semiBold",
  bold = "bold",
  extraBold = "extraBold",
  medium = "medium",
}
interface Props {
  textColor?: TextColor | string;
  className?: string;
  size?: TextSize;
  uppercase?: boolean;
  weight?: Weight;
  alignCenter?: boolean;
  children: ReactNode;
}

const Typography: FC<Props> = ({
  children,
  className,
  textColor = TextColor.primary,
  size = TextSize.L,
  uppercase = false,
  weight = Weight.regular,
  alignCenter = false,
  ...props
}) => {
  return (
    <span
      className={clx(
        styles.base,
        styles[size],
        styles[textColor],
        styles[weight],
        className,
        { [styles.uppercase]: uppercase },
        { [styles.alignCenter]: alignCenter },
      )}
      {...props}>
      {children}
    </span>
  );
};

export default Typography;
