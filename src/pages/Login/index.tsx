import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bullet from "src/components/Bullet";
import { TextColor } from "src/components/Typography";
import tokenMutation from "src/hooks/mutation/tokenMutation";
import { tokenHandler, tokenSelector } from "src/redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxUtils/types";
import { successToast } from "src/utils/toast";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);

  const { mutate } = tokenMutation();

  useEffect(() => {
    if (!!token) navigate("/"); //todo
  }, [token]);

  const login = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.other.readonly https://www.googleapis.com/auth/calendar.events",
    onSuccess: tokenResponse => {
      mutate(
        { token: tokenResponse.access_token },
        {
          onSuccess: data => {
            dispatch(tokenHandler(data));
            navigate("/");
            successToast("token saved");
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-1 h-full w-full">
      <Bullet
        className="w-16 bg-gray-400 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        textColor={TextColor.black}
        onClick={() => login()}>
        Вход через Google
      </Bullet>
    </div>
  );
};

export default Login;
