import React from "react";
import {
  withStyles,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button
} from "@material-ui/core";

const styles = {
  card: {
    maxWidth: 260,
    zoom: 0.76,
    transition: "all .5s ease",
    "&:hover": {
      transform: "scale(1.05)"
    }
  },
  media: {
    height: 390,
    width: 260
  }
};

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
    const { classes } = this.props;
    const { shows } = this.state;

    return (
      <div style={{ margin: "24px auto", maxWidth: 1200 }}>
        <div style={{ margin: "24px", display: "block" }}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => this.props.history.push("/admin/show/add")}
            fullWidth
          >
            Add new show
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            flexWrap: "wrap"
          }}
        >
          {shows.length > 0 ? (
            shows.map(show => (
              <Card
                className={classes.card}
                style={{ margin: "24px" }}
                onClick={() =>
                  this.props.history.push(`/admin/show/${show.excerpt}`)
                }
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={show.image.poster}
                    title={show.title}
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2" align="center">
                      {show.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          ) : (
            <Typography>"No shows in DB"</Typography>
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
          Show list
        </Typography>
        <Typography>
          <pre>{JSON.stringify(shows, null, 4)}</pre>
        </Typography>
      </Paper>
      */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ShowList);
