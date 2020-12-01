import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Rootreducer from "./store/reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import "./eruda";
const store = createStore(Rootreducer, applyMiddleware(thunk, logger));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {}); //runtime download
// }
