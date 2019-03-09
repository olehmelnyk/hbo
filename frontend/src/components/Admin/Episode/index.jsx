import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const EpisodeList = lazy(() => import("./EpisodeList"));
const EpisodeDetails = lazy(() => import("./EpisodeDetails"));
const EpisodeForm = lazy(() => import("./EpisodeForm"));

const NotFound = lazy(() => import("../../../pages/NotFound"));

const Episode = props => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress color="primary" />}>
        <Switch>
          <Route
            path="/admin/show/:show/season/:season/episode/add"
            render={props => <EpisodeForm {...props} />}
            exact
          />
          <Route
            path="/admin/show/:show/season/:season/episode"
            render={props => <EpisodeList {...props} />}
            exact
          />
          <Route
            path="/admin/show/:show/season/:season/episode/:episode/edit"
            render={props => <EpisodeForm {...props} />}
          />
          <Route
            path="/admin/show/:show/season/:season/episode/:episode"
            render={props => <EpisodeDetails {...props} />}
          />

          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Episode;
