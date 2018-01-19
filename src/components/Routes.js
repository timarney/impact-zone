import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Reset } from "./auth";
import Stats from "./stats/Stats";
import Attendance from "./attendance/Attendance";

/* 

TODO:
 - update attendance to handle id 
 - handle dropdown state via Redux / React Router so multiple routes can keep the state

*/

export const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/attendance/:id?" component={Attendance} />
        <PrivateRoute path="/stats/:id?" component={Stats} />
        <Route exact path="/reset" component={Reset} />
      </Switch>
    </div>
  </Router>
);
