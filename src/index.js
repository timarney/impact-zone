import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "./components/Routes";
import "./index.css";

import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();
