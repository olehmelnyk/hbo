/*
    This page renders page with all info regarding tv-show, including seasons and episode lists
*/
import React from "react";
import { Paper, Typography } from "@material-ui/core";

class ShowDetails extends React.Component {
  state = {
    show: {}
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`http://localhost:3001/api/v1/show/${id}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(show => {
        if (typeof show !== "object" || !show._id) {
          console.log(show);
          throw new Error("Bad data from server");
        }

        this.setState({ show });
      })
      .catch(error => {
        this.props.history.push("/page_not_found");
      });
  }

  render() {
    const { show } = this.state;

    return (
      <Paper
        style={{
          margin: "24px auto",
          padding: "24px",
          maxWidth: 960
        }}
      >
        <Typography component="h1" variant="h4">
          {show.title}
        </Typography>
        <Typography component="h2" variant="h5">
          {show.subtitle}
        </Typography>
        <Typography>
          {Object.entries(show).length > 0 ? (
            <pre>{JSON.stringify(show, null, 4)}</pre>
          ) : (
            "Loading..."
          )}
        </Typography>
      </Paper>
    );
  }
}

export default ShowDetails;
