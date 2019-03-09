import React from "react";
import { Paper, Typography } from "@material-ui/core";

class SeasonDetails extends React.Component {
  state = {
    season: {}
  };

  componentDidMount() {
    const { season } = this.props.match.params;

    fetch(`http://localhost:3001/api/v1/season/${season}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(season => {
        if (!season._id) {
          throw new Error("Bad response from the server");
        }
        this.setState({ season });
      })
      .catch(error => {
        console.log(error);
        this.props.history.push("/page_not_found");
      });
  }

  render() {
    const { season } = this.state;

    return (
      <Paper
        style={{
          margin: "24px auto",
          padding: "24px",
          maxWidth: 960
        }}
      >
        <Typography>
          <pre>{JSON.stringify(season, null, 4)}</pre>
        </Typography>
      </Paper>
    );
  }
}

export default SeasonDetails;
