import React from "react";
import { Route } from "react-router";
import { HomePage } from './HomePage';

export default () => (
  <Route>
    <Route path="/home" component={HomePage}></Route>
  </Route>
);
