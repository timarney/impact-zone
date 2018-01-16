import React from "react";

import App from "../App";

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    withRouter
  } from "react-router-dom";
import LoginForm from "./LoginForm";

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    //cb();
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    //cb();
    setTimeout(cb, 100);
  }
};

export const AuthExample = () => (
  <Router>
    <div>
      <AuthButton />
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/app" component={App} />
    </div>
  </Router>
);

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
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

export const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : null
);

export class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  from = "/";

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer && this.from !== from.pathname) {
      this.from = from.pathname;
      return <Redirect to={from} />;
    }

    return (
      <div>
        <LoginForm onSubmit={this.login} />
      </div>
    );
  }
}
