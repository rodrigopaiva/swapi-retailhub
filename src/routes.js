import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";  
import Main from "./pages/main";
import Person from "./pages/person";
 
const Routes = () => (
  <BrowserRouter>
    <Switch> 
      <Route exact path={"/"} component={ Main } />
      <Route path={"/person/:name"} component={ Person } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
