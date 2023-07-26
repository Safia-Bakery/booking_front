import clx from "classnames";
import { FC, ReactNode } from "react";
import Typography, { TextSize, TextColor, Weight } from "../Typography";
import styles from "./index.module.scss";

export enum BtnColor {
  primary = "primary",
  secondary = "secondary",
  yellow = "yellow",
  white = "white",
  gradient = "gradient",
}

interface Props {
  icon?: string;
  mainIcon?: string;
  children?: ReactNode;

  hasShadow?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  textColor?: TextColor;
  textSize?: TextSize;
  textWeight?: Weight;
  className?: string;
  reversed?: boolean;
  badge?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Bullet: FC<Props> = ({
  icon,
  mainIcon,
  hasShadow = true,
  onClick,
  textWeight = Weight.medium,
  textSize,
  textColor = TextColor.white,
  className,
  reversed,
  children,
  badge,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clx(
        className,
        styles.block,
        {
          [styles.hasShadow]: hasShadow,
        },
        {
          [styles.disabled]: disabled,
        },
        {
          [styles.reversed]: reversed,
        },
      )}>
      <div className={styles.text}>
        {mainIcon && <img src={mainIcon} alt="action-icon" className={styles.mainIcon} />}
        <Typography
          className={styles.textChild}
          textColor={textColor}
          size={textSize}
          weight={textWeight}>
          {children}
        </Typography>
        {badge && (
          <div className={styles.badge}>
            <Typography textColor={TextColor.white} size={TextSize.S} weight={Weight.medium}>
              {badge}
            </Typography>
          </div>
        )}
      </div>

      {icon && <img src={icon} alt="action-icon" className={styles.icon} />}
    </button>
  );
};

export default Bullet;
