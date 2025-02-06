import { Route, Routes, useNavigate } from "react-router-dom";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import styles from "./index.module.scss";
import cl from "classnames";
import {
  animationHandler,
  animationSelector,
  roomHandler,
  roomSelector,
} from "src/redux/reducers/reservations";
import { lazy, useEffect } from "react";
import Suspend from "../Suspend";
import useRooms from "src/hooks/useRooms";

const Home = lazy(() => import("src/pages/Home"));
const Login = lazy(() => import("src/pages/Login"));
const CalendarScreen = lazy(() => import("src/pages/Calendar"));

const Navigations = () => {
  const token = useAppSelector(tokenSelector);
  const { room_id, room_img } = useAppSelector(roomSelector);
  const dispatch = useAppDispatch();
  const isAnimating = useAppSelector(animationSelector);
  const { data: rooms, isLoading: roomsLoading } = useRooms({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  useEffect(() => {
    if (rooms?.length) dispatch(roomHandler({ room_id: rooms[0].id, room_img: rooms[0].image }));
  }, [rooms]);

  return (
    <div className={styles.app}>
      <div className={styles.bgBlock}>
        <div
          style={{ backgroundImage: `url(${room_img})` }}
          className={cl(
            styles.bgImg,
            isAnimating ? styles.animating : styles.animatingActive,
            // room_id === 1 ? styles.img2 : styles.img1,
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
