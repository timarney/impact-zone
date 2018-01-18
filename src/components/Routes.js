import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Reset } from "./auth";
import { Stats } from "./stats/Stats";

export const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/reset" component={Reset} />
      <PrivateRoute path="/stats" component={Stats} />
    </div>
  </Router>
);
