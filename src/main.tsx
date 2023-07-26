import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BaseAPIClient from "src/api/axiosConfig.ts";
import { persistor, store } from "src/redux/rootConfig.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export const baseURL = "http://localhost:8000";
export const apiClient = new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="815854327662-habclprffn7nne8t1iu23jov6jrn9ppg.apps.googleusercontent.com">
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>,
);
