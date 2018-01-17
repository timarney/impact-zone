import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Stats } from "./stats/Stats";
import { Login, Reset, Auth } from "./auth";

class PrivateRoute extends React.Component {
  state = {
    loading: true,
    isAuthenticated: false
  };
  async componentDidMount() {
    let isAuthenticated = await Auth.checkAuth();
    this.setState({
      loading: false,
      isAuthenticated
    });
  }
  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return <div>LOADING</div>;
    } else {
      return (
        <Route
          {...rest}
          render={props => {
            return !this.state.isAuthenticated ? (
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

export const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/reset" component={Reset} />
      <PrivateRoute path="/stats" component={Stats} />
    </div>
  </Router>
);
