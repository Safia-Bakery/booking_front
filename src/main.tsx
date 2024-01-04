import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BaseAPIClient from "src/api/axiosConfig.ts";
import { persistor, store } from "src/redux/rootConfig.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./utils/helpers.ts";
import { ToastContainer } from "react-toastify";

// export const baseURL = "http://10.0.2.59:8000";
export const baseURL = "https://backend.booking.safiabakery.uz";
export const apiClient = new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="584370108370-gu51j6u432c3gdicmu723dnei97en9ai.apps.googleusercontent.com">
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ToastContainer />
        </QueryClientProvider>
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>,
);
