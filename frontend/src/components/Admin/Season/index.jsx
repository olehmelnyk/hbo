import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const SeasonList = lazy(() => import("./SeasonList"));
const SeasonDetails = lazy(() => import("./SeasonDetails"));
const SeasonForm = lazy(() => import("./SeasonForm"));

const Episode = lazy(() => import("../Episode"));

const NotFound = lazy(() => import("../../../pages/NotFound"));

const Season = props => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress color="primary" />}>
        <Switch>
          <Route
            path="/admin/show/:show/season/:seson/episode"
            render={props => <Episode {...props} />}
          />

          <Route
            path="/admin/show/:show/season/add"
            render={props => <SeasonForm {...props} />}
            exact
          />
          <Route
            path="/admin/show/:show/season"
            render={props => <SeasonList {...props} />}
            exact
          />
          <Route
            path="/admin/show/:show/season/:season/edit"
            render={props => <SeasonForm {...props} />}
          />
          <Route
            path="/admin/show/:show/season/:season"
            render={props => <SeasonDetails {...props} />}
          />

          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Season;
