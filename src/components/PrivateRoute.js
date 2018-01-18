import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { monitorAuth } from "../actions";

class PrivateRoute extends React.Component {
  componentDidMount() {
    const { monitorAuth } = this.props;
    monitorAuth();
  }
  render() {
    const { component: Component, ...rest } = this.props;
    if (this.props.loading) {
      return <div>LOADING</div>;
    } else {
      return (
        <Route
          {...rest}
          render={props => {
            return !this.props.isAuthenticated ? (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            ) : (
              <Component {...this.props} />
            );
          }}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.main.loading
  };
};

export default connect(mapStateToProps, { monitorAuth })(PrivateRoute);
