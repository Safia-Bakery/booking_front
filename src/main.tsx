import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import BaseAPIClient from "src/api/axiosConfig.ts";
import { persistor, store } from "src/redux/rootConfig.ts";
import { queryClient } from "./utils/helpers.ts";
import "./index.css";
import { baseURL } from "./api/base_url.ts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ru";

dayjs.locale("ru");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

// export const baseURL = "http://10.0.0.91:8000";

export const apiClient = new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="584370108370-gu51j6u432c3gdicmu723dnei97en9ai.apps.googleusercontent.com">
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ToastContainer autoClose={600} />
        </QueryClientProvider>
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>,
);
