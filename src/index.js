import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";
import { rootReducer } from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "./App.css";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();
