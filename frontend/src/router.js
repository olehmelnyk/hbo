import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const Landing = lazy(() => import("./components/Main/Landing"));
const Show = lazy(() => import("./components/Main/Show"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Router = props => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress color="secondary" />}>
        <Switch>
          <Route path="/" render={props => <Landing {...props} />} exact />

          <Redirect from="/signin" to="/login" />
          <Redirect from="/signup" to="/register" />
          <Route path="/login" render={props => <Login {...props} exact />} />
          <Route
            path="/register"
            render={props => <Register {...props} exact />}
          />

          <Route path="/show" render={props => <Show {...props} />} />
          <Route path="/admin" render={props => <Admin {...props} />} />

          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
