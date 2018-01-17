import React from "react";
import { Auth } from "./Auth";
import { withRouter } from "react-router-dom";

export const SignOut = withRouter(
  ({ history }) =>
    Auth.checkAuth() ? (
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
    ) : null
);
