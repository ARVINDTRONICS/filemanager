import reportWebVitals from "./reportWebVitals";

import React from "react";
import ReactDOM from "react-dom";
import MadStreetRoutes from "./routes";
import ErrorBoundary from "./layouts/ErrorBoundary/ErrorBoundary";
//css
import "./assets/css/vendor/bootstrap.css";
import "./assets/css/icons/font-awesome.css";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

//scss
import "./assets/scss/index.scss";

ReactDOM.render(
  <ErrorBoundary>
    <div id="main">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MadStreetRoutes />
        </PersistGate>
      </Provider>
    </div>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
