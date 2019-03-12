import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { episode as episodeApi } from "../../../../api/hbo";
class EpisodeDetails extends React.Component {
  state = {
    episode: {}
  };

  componentDidMount() {
    const { episode } = this.props.match.params;

    episodeApi
      .get(`/${episode}`)
      .then(res => {
        if (res.status !== 200) throw new Error(res.data);
        this.setState({ episode: res.data });
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
      </Paper>
    );
  }
}

export default EpisodeDetails;
