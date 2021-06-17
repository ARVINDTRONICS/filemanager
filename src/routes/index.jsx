// @flow
import React, { Suspense } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import routes from "./route.config";
import { Loader } from "../components/Loader";
import { LogIn } from "../layouts/Login";

const MadStreetRoutes = () => {
  return (
    <Router>
      <Suspense fallback={Loader}>
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                return <route.component {...props} />;
              }}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default MadStreetRoutes;
