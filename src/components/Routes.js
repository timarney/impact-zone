import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Reset } from "./auth";
import Stats from "./stats/Stats";
import NotFound from "./NotFound";
import Attendance from "./attendance/Attendance";
import Signature from "./signature/Signature";

export const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/attendance/:id?/:date?" component={Attendance} />
        <PrivateRoute path="/signature/:id/:date/:user" component={Signature} />
        <PrivateRoute path="/stats/:id" component={Stats} />
        <Route exact path="/reset" component={Reset} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>
);
