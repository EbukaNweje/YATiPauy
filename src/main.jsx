import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./pages/Global/Store.js";
import { AlertProvider } from "./Components/AlertModal.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider>
      <App />
    </AlertProvider>
  </Provider>,
);
