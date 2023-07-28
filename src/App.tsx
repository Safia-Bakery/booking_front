import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "src/utils/helpers";
import { ToastContainer } from "react-toastify";
import Routes from "./components/Routes";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import "dayjs/locale/ru";
import { BrowserRouter } from "react-router-dom";
import MeetingInfoModal from "./components/MeetingInfoModal";
import dayjs from "dayjs";
dayjs.locale("ru");

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes />
        <MeetingInfoModal />
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
