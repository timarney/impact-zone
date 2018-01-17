import React, { Component } from "react";
import WarningIcon from "../../icons/Warning";

class LoginForm extends Component {
  clearFields = () => {};

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const email = this.email.value;
    const pass = this.pass.value;

    if (email && pass) {
      onSubmit({ email, pass });
    }
  };

  render() {
    return (
      <div>
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            <div className="input-wrap">
              <input
                onFocus={() => (this.email.value = "")}
                type="email"
                ref={node => (this.email = node)}
                placeholder="email"
                defaultValue="user@app.com"
              />
            </div>
            <div className="input-wrap">
              <input
                onFocus={() => (this.pass.value = "")}
                type="password"
                ref={node => (this.pass = node)}
                placeholder="password"
              />
            </div>
            <button type="submit">login</button>
            {this.props.err ? (
              <div className="warning">
                <WarningIcon /> <span className="msg">Login Failed</span>
              </div>
            ) : null}
          </form>
        </div>
        {this.props.render()}
      </div>
    );
  }
}

export default LoginForm;
