import React, { Component } from "react";
import WarningIcon from "../icons/Warning";
import { resetPassword } from "../util/firebase";

class ResetForm extends Component {
  clearFields = () => {};

  handleSubmit = event => {
    event.preventDefault();

    const email = this.email.value;
    resetPassword(email, response => {
      console.log(response);
    });
  };

  render() {
    return (
      <div>
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

            <button type="submit">reset</button>
            {this.props.err ? (
              <div className="warning">
                <WarningIcon /> <span className="msg">Login Failed</span>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default ResetForm;
