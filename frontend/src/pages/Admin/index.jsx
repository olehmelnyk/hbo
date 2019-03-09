import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const Show = lazy(() => import("../../components/Admin/Show"));

const NotFound = lazy(() => import("../NotFound"));

const Admin = props => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress color="primary" />}>
        <Switch>
          {/* 
            we can check here if user is authorised 
            and have access this admin area - 
            if not - redirect to page not found, lol 
          */}

          <Redirect from="/admin" to="/admin/show" exact />

          <Route path="/admin/show" render={props => <Show {...props} />} />

          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Admin;
