import React from "react";
import { Redirect, Link } from "react-router-dom";

import { Auth } from "./Auth";
import LoginForm from "./LoginForm";

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
      from: { pathname: "/stats" }
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
