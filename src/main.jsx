import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { WeddingApp } from "./WeddingApp";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store = { store } >
      <BrowserRouter>
        <WeddingApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
