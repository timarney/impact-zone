import React, { Component } from "react";
import ResetForm from "./ResetForm";
import { Redirect } from "react-router-dom";
import { resetPassword } from "../../util/firebase";

export class Reset extends Component {
  state = { err: null, success: null };
  handleSubmit = email => {
    resetPassword(email, response => {
      if (response.code) {
        this.setState({ err: response });
        return;
      }

      this.setState({ success: true });
    });
  };
  render() {
    const { err, success } = this.state;

    if (success) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="login-wrap">
        <ResetForm err={err} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
