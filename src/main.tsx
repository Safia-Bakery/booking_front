import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BaseAPIClient from "src/api/axiosConfig.ts";
import { persistor, store } from "src/redux/rootConfig.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export const baseURL = "http://booking.safiabakery.uz:8004";
export const apiClient = new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="472393125983-vhdijrojcjtj8n0h1dvcpejghn3td3k3.apps.googleusercontent.com">
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>,
);
