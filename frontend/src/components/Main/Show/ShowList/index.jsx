/*
    This page renders list of all tv-shows
*/
import React from "react";
import {
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Button,
  InputBase
} from "@material-ui/core";
import "./show-list.css";

class ShowList extends React.Component {
  state = {
    shows: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/show")
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(shows => {
        if (!Array.isArray(shows) || shows.length < 1) {
          throw new Error("No shows to display");
        } else {
          this.setState({ shows });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { shows } = this.state;

    return (
      <div className="container">
        <AppBar
          style={{
            backgroundColor: "#252837"
          }}
        >
          <Toolbar className="toolbar">
            <div className="search-container">
              <InputBase placeholder="Search…" />
            </div>

            <div className="shows-container">
              <h1 className="header">SHOWS</h1>
            </div>

            <div className="buttons-container">
              <Button className="login">Login</Button>
              <Button className="sign-up">Sign up</Button>
            </div>
          </Toolbar>
        </AppBar>

        {shows.length > 0 ? (
          shows.map(show => (
            <Paper
              key={show._id}
              style={{
                margin: "24px auto",
                maxWidth: 750,
                display: "flex",
                flexDirection: "row"
              }}
              onClick={() => this.props.history.push(`/show/${show.excerpt}`)}
            >
              <div className="show">
                <img src={show.image.poster} alt={show.title} />
              </div>

              <div className="show-container">
                <div className="text-container">
                  <p className="show-title">{show.title}</p>
                  <p className="show-genres">{show.genres}</p>
                  {/*<p className="show-created-at">created at {show.createdAt}</p>
                  <p className="show-updated-at">updated at{show.updatedAt}</p>*/}
                  <div className="seasons-and-episodes">
                    <p className="show-number-of-episodes">
                      {show.numberOfEpisodes} episodes
                    </p>
                    <hr />
                    <p className="show-number-of-seasons">
                      {show.numberOfSeasons} seasons
                    </p>
                  </div>
                </div>

                <div className="subtitle-container">
                  <p>{show.subtitle}</p>
                </div>
              </div>
            </Paper>
          ))
        ) : (
          <Paper
            style={{
              margin: "24px auto",
              padding: "24px",
              maxWidth: 750
            }}
          >
            <Typography component="p" variant="caption">
              No shows - nothing to display :(
            </Typography>
          </Paper>
        )}
      </div>
    );
  }
}

export default ShowList;
