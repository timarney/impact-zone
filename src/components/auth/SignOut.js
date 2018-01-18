import React from "react";
import { Auth } from "./Auth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const LogOut = ({ history, isAuthenticated }) => {
  return isAuthenticated ? (
    <p className="sign-out">
      <button
        className="btn"
        onClick={() => {
          Auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : null;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export const SignOut = withRouter(connect(mapStateToProps)(LogOut));
