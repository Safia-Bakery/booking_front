import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CalendarScreen from "src/pages/Calendar";
import Login from "src/pages/Login";
import Home from "src/pages/Home";
import { logoutHandler, tokenSelector } from "src/redux/reducers/authReducer";
import { animationHandler, animationSelector, roomSelector } from "src/redux/reducers/room";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import styles from "./index.module.scss";
import useVerify from "src/hooks/useVerify";
import cl from "classnames";

const Navigations = () => {
  const me = useAppSelector(tokenSelector);
  const room_id = useAppSelector(roomSelector);
  const dispatch = useAppDispatch();
  const { isError, error } = useVerify({ body: me, enabled: !!me });
  const isAnimating = useAppSelector(animationSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!me?.token) navigate("/login");
    if (isError || error) dispatch(logoutHandler());
  }, [me, isError, error]);

  return (
    <div className={styles.app}>
      <div className={styles.bgBlock}>
        <div
          className={cl(
            styles.bgImg,
            room_id === 1 ? styles.img1 : styles.img2,
            isAnimating ? styles.animating : styles.animatingActive,
          )}
          onAnimationEnd={() => dispatch(animationHandler(false))}
        />
      </div>
      <Routes>
        <Route element={<Home />} path={"/"} />
        <Route element={<Login />} path={"/login"} />
        <Route element={<CalendarScreen />} path={"/calendar"} />
      </Routes>
    </div>
  );
};

export default Navigations;
