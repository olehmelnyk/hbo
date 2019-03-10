import React from "react";
import { Paper, Typography, Button, Grid } from "@material-ui/core";

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
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </Button>

        {season._id && (
          <div style={{ margin: "24px 0" }}>
            <Grid
              container
              alignItems="flex-start"
              spacing={24}
              style={{ marginBottom: "36px" }}
            >
              <Grid item xs={4}>
                <img
                  src={season.image.poster}
                  alt={season.seasonName}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid>

              <Grid
                item
                xs={8}
                style={{
                  paddingLeft: "24px"
                }}
              >
                <Typography compontent="h1" variant="h4">
                  {season.show[0].title} - {season.seasonName}
                </Typography>
                <Typography compontent="h2" variant="h5">
                  {season.show[0].subtitle}
                </Typography>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      this.props.history.push(
                        `/admin/show/${show}/season/${season._id}/edit`
                      )
                    }
                    style={{ margin: "24px 24px 0 0" }}
                  >
                    Edit season
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      this.props.history.push(
                        `/admin/show/${show}/season/${season._id}/episode/add`
                      )
                    }
                    style={{ marginTop: "24px" }}
                  >
                    New Episode
                  </Button>
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ margin: "24px 0 16px" }}>
              <Typography component="h1" variant="h5">
                Episodes:
              </Typography>
            </Grid>

            <Grid
              container
              xs={12}
              spacing={24}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "start"
              }}
            >
              {season.episodes.length > 0 &&
                season.episodes.map(episode => (
                  <Grid item xs={4}>
                    <Paper
                      style={{
                        minHeight: "400px"
                      }}
                    >
                      <img
                        style={{ width: "100%" }}
                        src={episode.image.still}
                        alt={episode.episodeName}
                      />
                      <div
                        style={{
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between"
                        }}
                      >
                        <div>
                          <Typography component="h1" variant="title">
                            {episode.episodeNumber}: {episode.episodeName}
                          </Typography>
                          <Typography variant="body1">
                            {episode.description}
                          </Typography>
                          <Typography variant="caption" align="right">
                            {`Air date: ${new Date(
                              episode.airDate
                            ).toLocaleDateString()}`}
                          </Typography>
                        </div>
                        <div>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              this.props.history.push(
                                `/admin/show/${show}/season/${
                                  season._id
                                }/episode/${episode.excerpt}/edit`
                              )
                            }
                          >
                            Edit episode
                          </Button>
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                ))}
            </Grid>

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
