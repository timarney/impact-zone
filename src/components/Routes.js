import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Reset } from "./auth";
import Stats from "./stats/Stats";
import NotFound from "./NotFound";
import Attendance from "./attendance/Attendance";

/* 

TODO:
- default to stats view
- add "add new attendance link to top of the week view"
- don't allow add new attendance if attendance exists for that date
- stats view can link to archive for X date
- attendance/25/Pineview 2017/2017-11-28


*/

export const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/attendance/:id?/:date?" component={Attendance} />
        <PrivateRoute path="/stats/:id" component={Stats} />
        <Route exact path="/reset" component={Reset} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>
);
