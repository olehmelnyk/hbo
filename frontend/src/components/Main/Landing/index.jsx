/*
    This page renders list of featured tv-shows ("priority: true")
*/
import React from "react";
import { Paper, Typography, Card, CardContent, CardActionArea, CardActions, Button } from "@material-ui/core";
import { show as showApi } from "../../../api/hbo";
import './landing.css';
// const Landing = () => <div>Landing Page</div>;
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
      <Paper
        style={{
          margin: "135px auto",
          padding: "24px",
          maxWidth: 960
        }}
      >
        <Typography component="h1" variant="h4">
          {/*  Landing Page with featured-only TV-Shows */}
        </Typography>

        <Typography>
          {shows && shows.length ? (
            shows.map(show => (
              <div class="show-container">

                <img class="backdrop-image" src={show.image.backdrop} alt="backdrop-image" />

                <div class="card-container">

                  <Card className="backdrop-image-container" style={{
                    backgroundColor: 'transparent'
                  }}>

                    <CardContent className="landing-show-container">

                      <div className="genres-cont">
                        <Typography className="genres" component="p">{show.genres}</Typography>
                      </div>

                      <Typography className="title" gutterBottom component="h2">{show.title}</Typography>

                      <div className="subtitle-cont">
                        <Typography className="subtitle" component="p">{show.subtitle}</Typography>
                      </div>

                      <Typography className="seasons-and-episodes" component="p">
                        <p>{show.numberOfSeasons} seasons</p>
                        <hr/>
                        <p>{show.numberOfEpisodes} episodes</p>
                      </Typography>




                    </CardContent>

                  </Card>

                  {/* <Button className="learn-more-button">
                    <Typography className="learn-more" component="p">Learn More</Typography>
                    </Button>*/}

                </div>


              </div>

              /* here you have data from server 
                <pre>{JSON.stringify(show, null, 4)}</pre>
              */
            ))

          ) : (
              "No shows - nothing to display :("
            )}
        </Typography>
      </Paper>
    );
  }
}

export default Landing;
