import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import PrivateRoute from "./apicalls/AdminRoute";

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
