import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configStore from "./store/configStore";

const store = configStore();

console.log("store", store.getState());

//subscribe
store.subscribe(() => {
  console.log("sub", store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
