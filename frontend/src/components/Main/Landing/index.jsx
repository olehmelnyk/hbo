/*
    This page renders list of featured tv-shows ("priority: true")
*/
import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { show as showApi } from "../../../api/hbo";

// const Landing = () => <div>Landing Page</div>;
class Landing extends React.Component {
  state = {
    shows: []
  };

  componentDidMount() {
    showApi
      .get("/featured")
      .then(res => {
        if (res.status !== 200) throw new Error(res.data);
        this.setState({ shows: res.data });
      })
      .catch(error => {
        console.log(error);
      });
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
