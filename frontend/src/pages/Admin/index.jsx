import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const ShowList = lazy(() => import("components/Admin/Show/ShowList"));
const ShowItem = lazy(() => import("components/Admin/Show/ShowItem"));
const ShowForm = lazy(() => import("components/Admin/Show/ShowForm"));

const NotFound = lazy(() => import("pages/NotFound"));

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

          <Route
            path="/admin/show/add"
            render={props => <ShowForm {...props} />}
            exact
          />
          <Route
            path="/admin/show"
            render={props => <ShowList {...props} />}
            exact
          />
          <Route
            path="/admin/show/:id/edit"
            render={props => <ShowForm {...props} />}
          />
          <Route
            path="/admin/show/:id"
            render={props => <ShowItem {...props} />}
          />

          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Admin;
