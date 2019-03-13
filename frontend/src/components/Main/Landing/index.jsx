/*
    This page renders list of featured tv-shows ("priority: true")
*/
import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { show as showApi } from "../../../api/hbo";
import "./landing.css";

class Landing extends React.Component {
  state = {
    shows: []
  };

  componentDidMount() {
    showApi
      .get("/featured")
      .then(res => {
        if (res.status !== 200) throw new Error(res.data);
        this.setState({ shows: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { shows } = this.state;

    return (
      <div>
        {shows && shows.length ? (
          shows.map((show, index) => (
            <section
              key={show._id}
              style={{
                background: `center / cover no-repeat url("${
                  show.image.backdrop
                }")`,
                width: "100vw",
                height: "100vh",
                position: "relative"
              }}
            >
              <div
                style={{
                  width: "800px",
                  padding: "24px",
                  position: "absolute",
                  bottom: "50px",
                  left: "50px",
                  background: "rgba(255, 255, 255, 0.95)",
                  zoom: "0.9"
                }}
                onClick={() => this.props.history.push(`/show/${show.excerpt}`)}
              >
                <Typography variant="h5">
                  {show.title} ({new Date(show.firstAirDate).getFullYear()}-
                  {show.inProduction
                    ? "..."
                    : new Date(show.lastAirDate).getFullYear()}
                  )
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {show.subtitle}
                </Typography>
                <Typography gutterBottom>{show.genres.join(", ")}</Typography>

                <Typography style={{ textTransform: "uppercase" }}>
                  {`${show.numberOfSeasons} seasons • ${
                    show.numberOfEpisodes
                  } episodes`}
                </Typography>
              </div>
            </section>
          ))
        ) : (
          <Paper>
            <Typography>"No shows to dispay."</Typography>
          </Paper>
        )}

        {/*
          
          <Paper
        style={{
          margin: "135px auto",
          padding: "24px",
          maxWidth: 960
        }}
      >
        <div>
          {shows && shows.length
            ? shows.map(show => (
                <div
                  className="show-container"
                  key={show._id}
                  onClick={() => {
                    this.props.history.push(`/show/${show.excerpt}`);
                  }}
                >
                  <img
                    className="backdrop-image"
                    src={show.image.backdrop}
                    alt={show.title}
                  />

                  <div className="card-container">
                    <Card
                      className="backdrop-image-container"
                      style={{
                        backgroundColor: "transparent"
                      }}
                    >
                      <CardContent className="landing-show-container">
                        <div className="genres-cont">
                          <Typography className="genres" component="p">
                            {show.genres}
                          </Typography>
                        </div>

                        <Typography
                          className="title"
                          gutterBottom
                          component="h2"
                        >
                          {show.title}
                        </Typography>

                        <div className="subtitle-cont">
                          <Typography className="subtitle" component="p">
                            {show.subtitle}
                          </Typography>
                        </div>

                        <div className="seasons-and-episodes">
                          <p>{show.numberOfSeasons} seasons</p>
                          <hr />
                          <p>{show.numberOfEpisodes} episodes</p>
                        </div>
                      </CardContent>
                    </Card>

            
      </div>
                </div >

              
              ))
            : "No shows - nothing to display :("
  }
        </div>
      </Paper >

          */}
      </div>
    );
  }
}

export default Landing;
