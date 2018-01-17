import React, { Component } from "react";
import WarningIcon from "../../icons/Warning";

class ResetForm extends Component {
  clearFields = () => {};

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const email = this.email.value;
    onSubmit(email);
  };

  render() {
    const { err } = this.props;
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

            <button type="submit">reset</button>
            {err ? (
              <div className="warning">
                <WarningIcon /> <span className="msg">Reset Failed</span>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default ResetForm;
