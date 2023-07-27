import { FC, PropsWithChildren } from "react";
import styles from "./index.module.scss";
import cl from "classnames";
import Container from "../Container";

interface Props extends PropsWithChildren {
  title?: string;
  subTitle?: string;
}

const Header: FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div className={cl(styles.header)}>
      <Container>{children}</Container>
    </div>
  );
};

export default Header;
