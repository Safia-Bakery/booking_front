import { FC } from "react";
import Typography, { TextColor, TextSize, Weight } from "../Typography";

interface Props {
  error: string;
}

const Alert: FC<Props> = ({ error }) => {
  return (
    <div className="p-2 bg-red-100 flex items-center gap-2 mt-2 rounded-md ">
      <img src="/assets/icons/warning.svg" width={22} height={22} alt="warn" />
      <Typography size={TextSize.S} weight={Weight.regular} textColor={TextColor.black}>
        {error}
      </Typography>
    </div>
  );
};

export default Alert;
