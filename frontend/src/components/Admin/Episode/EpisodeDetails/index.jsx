import React from "react";
import { Paper, Typography } from "@material-ui/core";

class EpisodeDetails extends React.Component {
  state = {
    episode: {}
  };

  componentDidMount() {
    const { episode } = this.props.match.params;

    fetch(`http://localhost:3001/api/v1/episode/${episode}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(episode => {
        if (!episode._id) {
          throw new Error("Bad response from the server");
        }
        this.setState({ episode });
      })
      .catch(error => {
        console.log(error);
        this.props.history.push("/page_not_found");
      });
  }

  render() {
    const { episode } = this.state;

    return (
      <Paper
        style={{
          margin: "24px auto",
          padding: "24px",
          maxWidth: 960
        }}
      >
        <Typography>
          <pre>{JSON.stringify(episode, null, 4)}</pre>
        </Typography>
      </Paper>
    );
  }
}

export default EpisodeDetails;
