import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import "./styles.css";
import { EnvironmentContext, createEnvironment } from "./relay-environment";

const client = createEnvironment();

ReactDOM.render(
  <React.StrictMode>
    <EnvironmentContext.Provider value={client}>
      <App />
    </EnvironmentContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
