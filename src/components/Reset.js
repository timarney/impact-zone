import React, { Component } from "react";
import ResetForm from "./ResetForm";

class Reset extends Component {
  state = {};
  render() {
    return (
      <div className="login-wrap">
        {" "}
        <ResetForm />{" "}
      </div>
    );
  }
}

export default Reset;
