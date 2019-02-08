import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Body from "./components/Body/Body";

export default (
  <Switch>
    <Route path="/main" component={Body} />
    <Route path="/" component={Landing} />
  </Switch>
);
