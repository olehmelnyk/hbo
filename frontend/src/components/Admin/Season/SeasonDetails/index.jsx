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
    const { show } = this.props.match.params;

    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "24px auto"
        }}
      >
        {season._id && (
          <div>
            <div>
              <img src={season.image.poster} alt={season.seasonName} />
              <Typography compontent="h1" variant="h4">
                {season.show[0].title} - {season.seasonName}
              </Typography>
              <Typography compontent="h2" variant="h5">
                {season.show[0].subtitle}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "start"
              }}
            >
              {season.episodes.length > 0 &&
                season.episodes.map(episode => (
                  <Paper
                    style={{
                      maxWidth: "500px",
                      margin: "24px auto",
                      width: "800px"
                    }}
                    onClick={() =>
                      this.props.history.push(
                        `/admin/show/${show}/season/${season._id}/episode/${
                          episode.excerpt
                        }`
                      )
                    }
                  >
                    <img
                      style={{ width: "100%" }}
                      src={episode.image.still}
                      alt={episode.episodeName}
                    />
                    <div style={{ padding: "24px" }}>
                      <Typography component="h1" variant="title">
                        {episode.episodeNumber}: {episode.episodeName}
                      </Typography>
                      <Typography variant="subtitle1">
                        {episode.description}
                      </Typography>
                      <Typography variant="caption" align="right">
                        Air date:{" "}
                        {new Date(episode.airDate).toLocaleDateString()}
                      </Typography>
                    </div>
                  </Paper>
                ))}
            </div>

            {/*
            <Paper
              style={{
                margin: "24px auto",
                padding: "24px",
                maxWidth: "1200px"
              }}
            >
              <Typography>
                <pre>{JSON.stringify(season, null, 4)}</pre>
              </Typography>
            </Paper>
            */}
          </div>
        )}
      </div>
    );
  }
}

export default SeasonDetails;
