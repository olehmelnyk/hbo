import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import ShowList from "./ShowList";
import ShowDetails from "./ShowDetails";
import NotFound from "../../../pages/NotFound";

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/show" component={ShowList} exact />
        <Route path="/show/:id" component={ShowDetails} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
