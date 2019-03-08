import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const Landing = lazy(() => import("./components/Main/Landing"));
const Show = lazy(() => import("./components/Main/Show"));
const Signin = lazy(() => import("./pages/Auth/signin"));
const Signup = lazy(() => import("./pages/Auth/signup"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Router = props => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress color="secondary" />}>
        <Switch>
          <Route path="/" render={props => <Landing {...props} />} exact />

          <Redirect from="/login" to="/signin" />
          <Redirect from="/register" to="/signup" />
          <Route path="/signin" render={props => <Signin {...props} exact />} />
          <Route path="/signup" render={props => <Signup {...props} exact />} />

          <Route path="/show" render={props => <Show {...props} />} />
          <Route path="/admin" render={props => <Admin {...props} />} />

          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
