import React, { Component } from "react";
import WarningIcon from "../icons/Warning";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  clearFields = () => {
    this.setState({ error: false });
  };

  handleSubmit = event => {
    const onSubmit = this.props.onSubmit;
    event.preventDefault();

    const email = this.email.value;
    const pass = this.pass.value;

    if (email && pass) {
      console.log("email", email, "pass", pass);
      onSubmit(email, pass);
    }
  };

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <div className="input-wrap">
            <input
              onFocus={this.clearFields}
              type="email"
              ref={node => (this.email = node)}
              placeholder="email"
              defaultValue="user@app.com"
            />
          </div>
          <div className="input-wrap">
            <input
              onFocus={this.clearFields}
              type="password"
              ref={node => (this.pass = node)}
              placeholder="password"
            />
          </div>
          <button type="submit">login</button>
          {this.state.error && (
            <div className="warning">
              <WarningIcon /> <span className="msg">Login Failed</span>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default LoginForm;
