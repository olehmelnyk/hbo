import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const ShowList = lazy(() => import("./ShowList"));
const ShowDetails = lazy(() => import("./ShowDetails"));
const ShowForm = lazy(() => import("./ShowForm"));

const Season = lazy(() => import("../Season"));

const NotFound = lazy(() => import("../../../pages/NotFound"));

const Show = props => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress color="primary" />}>
        <Switch>
          <Route
            path="/admin/show/:show/season"
            render={props => <Season {...props} />}
          />

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
            render={props => <ShowDetails {...props} />}
          />

          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Show;
