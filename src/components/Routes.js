import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";

import App from "../App";
import Reset from "./Reset";
import { Login } from "./Login";
import { SignOut } from "./SignOut";
import { Auth } from "./Auth";

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
      <SignOut />
      <Route exact path="/" component={Login} />
      <Route exact path="/reset" component={Reset} />
      <PrivateRoute path="/app" component={App} />
    </div>
  </Router>
);
