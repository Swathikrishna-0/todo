// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import RouterRoot from "./RouterRoot";   // <— this file from earlier
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterRoot />
  </React.StrictMode>
);
