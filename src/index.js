import React from "react";
import ReactDOM from "react-dom";
import { AuthExample } from "./components/Login";
import "./index.css";

import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<AuthExample />, document.getElementById("root"));
registerServiceWorker();
