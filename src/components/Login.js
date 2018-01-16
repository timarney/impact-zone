import React from "react";
import App from "../App";
import firebase from "../config-firebase.js";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  withRouter,
  Link
} from "react-router-dom";
import LoginForm from "./LoginForm";

export const Auth = {
  isAuthenticated: false,
  authenticate(cb, user) {
    const self = this;

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.pass)
      .then(response => {
        console.log("lets go", response);
        console.log(cb);
        self.isAuthenticated = true;
        cb(null);
      })
      .catch(function(error) {
        self.isAuthenticated = false;
        cb(error);
      });
  },
  signout(cb) {
    this.isAuthenticated = false;
    firebase
      .auth()
      .signOut()
      .then(function() {
        cb();
      })
      .catch(function(error) {
        console.log("signout err", error);
        cb(error);
      });
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

export const AuthButton = withRouter(
  ({ history }) =>
    Auth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            Auth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : null
);

export class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    err: null
  };

  from = "/";

  handleLogin = err => {
    if (err) {
      this.setState({ redirectToReferrer: false, err: "ya" });
      return;
    }

    this.setState({ redirectToReferrer: true, err: null });
  };

  login = user => {
    Auth.authenticate(this.handleLogin, user);
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" }
    };

    const { redirectToReferrer, err } = this.state;

    if (redirectToReferrer && this.from !== from.pathname) {
      this.from = from.pathname;
      return <Redirect to={from} />;
    }

    return (
      <div className="login-wrap">
        <LoginForm
          onSubmit={this.login}
          err={err}
          render={() => {
            return (
              <div className="reset">
                <Link to="/reset">Forgot your password?</Link>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
