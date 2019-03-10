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
          maxWidth: 1200
        }}
      >
        {episode._id && (
          <div>
            <img
              src={episode.image.still}
              alt={episode.episodeName}
              style={{
                width: "100%"
              }}
            />
            <div
              style={{
                padding: "24px"
              }}
            >
              <Typography>
                {episode.show[0].title}: S{episode.episodeNumber}E
                {episode.episodeNumber}
              </Typography>
              <Typography
                component="h1"
                variant="h4"
                style={{ marginTop: "24px" }}
              >
                {episode.episodeNumber}: {episode.episodeName}
              </Typography>
              <Typography component="h2" variant="h5">
                {episode.description}
              </Typography>
              <Typography align="right">
                Air date: {new Date(episode.airDate).toLocaleDateString()}
              </Typography>
            </div>
          </div>
        )}

        {/*
        <Typography>
          <pre>{JSON.stringify(episode, null, 4)}</pre>
        </Typography>
        */}
      </Paper>
    );
  }
}

export default EpisodeDetails;
