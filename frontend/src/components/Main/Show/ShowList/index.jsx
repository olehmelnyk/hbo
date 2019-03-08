/*
    This page renders list of all tv-shows
*/
import React from "react";
import { Paper, Typography } from "@material-ui/core";

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
      <Paper
        style={{
          maxWidth: 960,
          margin: "24px auto",
          padding: 24
        }}
      >
        <Typography component="h1" variant="h4">
          Page that show list of all TV-shows (not just featured ones)
        </Typography>
        <Typography>
          {shows && shows.length ? (
            /* here you have data from server */
            <pre>{JSON.stringify(shows, null, 4)}</pre>
          ) : (
            "No shows - nothing to display :("
          )}
        </Typography>
      </Paper>
    );
  }
}

export default ShowList;
