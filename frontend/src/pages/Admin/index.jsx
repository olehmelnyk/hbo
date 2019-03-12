import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentication";
import { withRouter } from "react-router-dom";

const Show = lazy(() => import("../../components/Admin/Show"));
const User = lazy(() => import("../../components/Admin/User"));

const NotFound = lazy(() => import("../NotFound"));

class Admin extends React.Component {
  state = {};

  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;

    if (!isAuthenticated || user.exp < Math.round(Date.now() / 1000)) {
      this.props.logoutUser(this.props.history);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <Switch>
            <Redirect from="/admin" to="/admin/show" exact />
            <Route path="/admin/show" render={props => <Show {...props} />} />
            <Route path="/admin/user" render={props => <User {...props} />} />

            <Route render={props => <NotFound {...props} />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Admin));
