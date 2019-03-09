/*
    This page renders list of featured tv-shows ("priority: true")
*/
import React from "react";
import { Paper, Typography } from "@material-ui/core";

// const Landing = () => <div>Landing Page</div>;
class Landing extends React.Component {
  state = {
    shows: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/show/featured")
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
          margin: "24px auto",
          padding: "24px",
          maxWidth: 960
        }}
      >
        <Typography component="h1" variant="h4">
          Landing Page with featured-only TV-Shows
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

export default Landing;
