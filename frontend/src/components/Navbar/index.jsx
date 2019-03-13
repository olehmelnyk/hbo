import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentication";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  InputBase
} from "@material-ui/core";
import './navbar.css';

class Navbar extends Component {
  onLogout = event => {
    event.preventDefault();

    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="">
        <div className="" onClick={this.onLogout}>
          <img
            src={user.avatar}
            alt={user.name}
            title={user.name}
            className="rounded-circle"
            style={{ width: "25px", marginRight: "5px" }}
          />
          Logout
        </div>
      </ul>
    );

    const guestLinks = (
      <ul className="list">
        <li className="item">
          <Link className="link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="">
          <Link className="link" to="/login">
            Sign In
          </Link>
        </li>
      </ul>
    );

    return (

      <AppBar
        style={{
          backgroundColor: "#252837"
        }}
      >
        <Toolbar className="toolbar">
          {/*<div className="search-container">
              <InputBase placeholder="Search…" />
            </div>*/}

          <Link className="shows-container" to="/">
            <h1 className="header" style={{
              color: '#fff',
              margin: '15px'
            }}>
            <p style={{
              fontSize: '30px',
              fontWeight: 'bold',
              margin: '0'
            }}>HBO</p>
            <p style={{
              fontSize: '22px',
              fontWeight: 'normal',
              letterSpacing: '-1px',
              margin: '0',
              position: 'relative',
              top: '-10px'
            }}>shows</p>
            </h1>
          </Link>

          <div className="current-page">
            <p>Current page</p>
          </div>

          <div className="buttons-container">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </Toolbar>
      </AppBar>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
