import { Route, Routes, useNavigate } from "react-router-dom";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import styles from "./index.module.scss";
import cl from "classnames";
import { animationHandler, animationSelector, roomSelector } from "src/redux/reducers/reservations";
import { lazy, useEffect } from "react";
import Suspend from "../Suspend";

const Home = lazy(() => import("src/pages/Home"));
const Login = lazy(() => import("src/pages/Login"));
const CalendarScreen = lazy(() => import("src/pages/Calendar"));

const Navigations = () => {
  const token = useAppSelector(tokenSelector);
  const room_id = useAppSelector(roomSelector);
  const dispatch = useAppDispatch();
  const isAnimating = useAppSelector(animationSelector);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <div className={styles.app}>
      <div className={styles.bgBlock}>
        <div
          className={cl(
            styles.bgImg,
            room_id === 1 ? styles.img2 : styles.img1,
            isAnimating ? styles.animating : styles.animatingActive,
          )}
          onAnimationEnd={() => dispatch(animationHandler(false))}
        />
      </div>
      <Routes>
        <Route
          element={
            <Suspend>
              <Home />
            </Suspend>
          }
          path={"/"}
        />
        <Route
          element={
            <Suspend>
              <Login />
            </Suspend>
          }
          path={"/login"}
        />
        <Route
          element={
            <Suspend>
              <CalendarScreen />
            </Suspend>
          }
          path={"/calendar"}
        />
      </Routes>
    </div>
  );
};

export default Navigations;
