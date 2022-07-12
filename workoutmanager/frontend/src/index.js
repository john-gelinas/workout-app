import React from "react";
import App from "./components/App";
import ReactDom from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
