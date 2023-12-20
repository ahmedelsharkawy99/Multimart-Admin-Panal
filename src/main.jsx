import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import store from "./shared/store/store.js";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
