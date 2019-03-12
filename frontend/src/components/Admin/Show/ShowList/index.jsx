import React from "react";
import {
  withStyles,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button
} from "@material-ui/core";
import { show as showApi } from "../../../../api/hbo";

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
    showApi
      .get("/")
      .then(res => {
        if (res.status !== 200) throw new Error(res.data);
        this.setState({ shows: res.data });
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
                key={show._id}
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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ShowList);
