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
        }
        return response.json();
      })
      .then(shows => {
        if (!Array.isArray(shows)) {
          throw new Error("Bad response from the server");
        }
        this.setState({ shows });
      })
      .catch(error => console.log(error));
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
          Show list
        </Typography>
        <Typography>
          <pre>{JSON.stringify(shows, null, 4)}</pre>
        </Typography>
      </Paper>
    );
  }
}

export default ShowList;
