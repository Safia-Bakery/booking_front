import Routes from "./components/Routes";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import "dayjs/locale/ru";
import MeetingInfoModal from "./components/MeetingInfoModal";
import dayjs from "dayjs";

dayjs.locale("ru");

const App = () => {
  return (
    <>
      <Routes />
      <MeetingInfoModal />
    </>
  );
};

export default App;
