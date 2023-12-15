import Routes from "./components/Routes";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import "dayjs/locale/ru";
import MeetingInfoModal from "./components/MeetingInfoModal";
import dayjs from "dayjs";
import { useAppSelector } from "./redux/reduxUtils/types";
import { tokenSelector } from "./redux/reducers/authReducer";

dayjs.locale("ru");

const App = () => {
  const token = useAppSelector(tokenSelector);
  console.log(token, "token");
  return (
    <>
      <Routes />
      <MeetingInfoModal />
    </>
  );
};

export default App;
