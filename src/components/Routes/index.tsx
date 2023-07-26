import cl from "classnames";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CalendarScreen from "src/pages/Calendar";
import Login from "src/pages/Login";
import Main from "src/pages/Main";
import { tokenSelector } from "src/redux/reducers/authReducer";
import { roomSelector } from "src/redux/reducers/room";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import styles from "./index.module.scss";
import verifyMutation from "src/hooks/mutation/verifyMutation";
import { userEmails } from "src/redux/reducers/reservations";
import { emailsArr } from "src/utils/helpers";

const Navigations = () => {
  const token = useAppSelector(tokenSelector);
  const room_id = useAppSelector(roomSelector);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { mutate } = verifyMutation();

  useEffect(() => {
    if (!token) navigate("/login");
    dispatch(userEmails(emailsArr));
  }, [token]);

  // mutate({
  //   access_token:
  //     "ya29.a0AbVbY6PJonCiJppMrPIMCt8aRVOtYOItGX1Djj0NMe6-ophmrnETP-0RocFXJJ-94o6WPFVXEP8HHc-_Q0VnWoBgIVbL5MK8VnRRLLMfwUi1ucWRsa7ip70mLul8bEPrj3490E7r4x5fUMC2fCVvJhA2WsLBaCgYKASgSARISFQFWKvPlkwgWaSM6T05l5xjPORGyqw0163",
  //   client_id: "472393125983-vhdijrojcjtj8n0h1dvcpejghn3td3k3.apps.googleusercontent.com",
  //   refresh_token:
  //     "1//095F-f1yTnZWdCgYIARAAGAkSNgF-L9IrpSnym00s7wg3DGeFgVergZ4kg9PDReON8peLDgJ4szL4xnBfubeDfH65TUBZ1PRgiQ",
  //   client_secret: "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",
  // });

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
