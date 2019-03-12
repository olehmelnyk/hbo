import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const UserList = lazy(() => import("./UserList"));
const UserDetails = lazy(() => import("./UserDetails"));
const UserForm = lazy(() => import("./UserForm"));

const NotFound = lazy(() => import("../../../pages/NotFound"));

const Show = props => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress color="primary" />}>
        <Switch>
          <Route
            path="/admin/user/add"
            render={props => <UserForm {...props} />}
            exact
          />
          <Route
            path="/admin/user"
            render={props => <UserList {...props} />}
            exact
          />
          <Route
            path="/admin/user/:id/edit"
            render={props => <UserForm {...props} />}
          />
          <Route
            path="/admin/user/:id"
            render={props => <UserDetails {...props} />}
          />

          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Show;
