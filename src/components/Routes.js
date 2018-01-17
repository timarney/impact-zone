import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Stats } from "./stats/Stats";
import { Login, Reset, Auth } from "./auth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/reset" component={Reset} />
      <PrivateRoute path="/stats" component={Stats} />
    </div>
  </Router>
);
