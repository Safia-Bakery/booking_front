import cl from "classnames";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CalendarScreen from "src/pages/Calendar";
import Login from "src/pages/Login";
import Main from "src/pages/Main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { roomSelector } from "src/redux/reducers/room";
import { useAppSelector } from "src/redux/reduxUtils/types";
import styles from "./index.module.scss";

const Navigations = () => {
  const token = useAppSelector(tokenSelector);
  const room_id = useAppSelector(roomSelector);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <div className={styles.app}>
      <img
        src={room_id === 1 ? "/assets/images/bg1.JPG" : "/assets/images/bg2.JPG"}
        alt="room-image"
        className={styles.img}
      />
      <Routes>
        <Route element={<Main />} path={"/"} />
        <Route element={<Login />} path={"/login"} />
        <Route element={<CalendarScreen />} path={"/calendar"} />
      </Routes>
    </div>
  );
};

export default Navigations;
