import React from "react";
import { Auth } from "./Auth";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";

const Menu = ({ history, isAuthenticated, locationId }) => {
  return isAuthenticated ? (
    <div className="main-nav">
      <NavLink
        className="btn"
        to={`/stats/${locationId}`}
        activeStyle={{
          opacity: 0
        }}
      >
        Stats
      </NavLink>

      <button
        className="btn"
        onClick={() => {
          Auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </div>
  ) : null;
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    locationId: ownProps.match.params.id
  };
};

export const Nav = withRouter(connect(mapStateToProps)(Menu));
