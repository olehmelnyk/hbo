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
    maxWidth: 1600,
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
            Back
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
              <Typography component="h1" variant="headline">
                {show.title}
              </Typography>
              <Typography component="p" variant="subtitle1">
                {show.subtitle}
              </Typography>
              <Typography component="p" variant="caption">
                {show.genres && show.genres.join(", ")}
              </Typography>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "start",
                  marginTop: "24px"
                }}
              >
                {show.seasons.map(season => (
                  <Grid item xs={2}>
                    <Paper
                      onClick={() =>
                        this.props.history.push(
                          `/admin/show/${show.excerpt}/season/${season.excerpt}`
                        )
                      }
                    >
                      <img
                        src={season.image.poster}
                        alt={season.seasonName}
                        style={{ width: "100%" }}
                      />
                      <Typography>{season.seasonName}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </div>
            </Grid>
          </Grid>
        )}

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
      </div>
    );
  }
}

export default withStyles(styles)(ShowDetails);
