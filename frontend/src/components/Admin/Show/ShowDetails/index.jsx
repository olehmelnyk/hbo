import React from "react";
import {
  withStyles,
  Paper,
  Typography,
  Grid,
  Link,
  Button
} from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    margin: `${theme.spacing.unit * 3}px auto`
  },
  paper: {
    padding: theme.spacing.unit * 3,
    color: theme.palette.text.secondary
  }
});

class ShowDetails extends React.Component {
  state = {
    show: {}
  };

  componentDidMount() {
    const excerpt = this.props.match.params.id;

    fetch(`http://localhost:3001/api/v1/show/${excerpt}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(show => {
        if (!show._id) {
          throw new Error("Bad response from the server");
        }
        this.setState({ show });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { show } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "24px 0"
          }}
        >
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => this.props.history.push("/admin/show")}
          >
            Show list
          </Button>
          <div>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() =>
                this.props.history.push(
                  `/admin/show/${show.excerpt}/season/add`
                )
              }
              style={{ marginRight: "24px" }}
            >
              New season
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() =>
                this.props.history.push(`/admin/show/${show.excerpt}/edit`)
              }
            >
              Edit
            </Button>
          </div>
        </div>
        {show._id && (
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <img
                src={show.image.poster}
                alt={show.title}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography component="h1" variant="h4">
                {show.title}
              </Typography>
              <Typography component="h2" variant="h5">
                {show.subtitle}
              </Typography>

              <div
                style={{
                  marginTop: "16px"
                }}
              >
                <Typography component="p" variant="caption">
                  {new Date(show.firstAirDate).getFullYear()} -{" "}
                  {show.inProduction
                    ? "..."
                    : new Date(show.lastAirDate).getFullYear()}{" "}
                  ({show.status})
                </Typography>
                <Typography component="p">
                  Seasons / episodes: {show.numberOfSeasons} /{" "}
                  {show.numberOfEpisodes}
                </Typography>
                <Typography component="p">
                  Run time: {show.episodeRunTime}m
                </Typography>
                <Typography component="p">
                  Genre: {show.genres && show.genres.join(", ")}
                </Typography>
              </div>

              <div
                style={{
                  marginTop: "24px"
                }}
              >
                {show.seasons
                  .sort((a, b) => a.seasonNumber - b.seasonNumber)
                  .map(season => (
                    <Grid
                      item
                      xs={2}
                      style={{
                        float: "left",
                        margin: "0 24px 24px 0"
                      }}
                    >
                      <Paper
                        onClick={() =>
                          this.props.history.push(
                            `/admin/show/${show.excerpt}/season/${season._id}`
                          )
                        }
                      >
                        <img
                          src={season.image.poster}
                          alt={season.seasonName}
                          style={{ width: "100%", height: "200px" }}
                        />
                        <Typography
                          variant="caption"
                          style={{ padding: "8px" }}
                        >
                          {season.seasonName}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
              </div>
            </Grid>
          </Grid>
        )}

        {/*
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
          <Typography>
            <pre>{JSON.stringify(show, null, 4)}</pre>
          </Typography>
        </Paper>
        */}
      </div>
    );
  }
}

export default withStyles(styles)(ShowDetails);
