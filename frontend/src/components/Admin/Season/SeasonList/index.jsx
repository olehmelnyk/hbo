import React from "react";
import { Paper, Typography } from "@material-ui/core";

class SeasonList extends React.Component {
  state = {
    seasons: {}
  };

  componentDidMount() {
    const { show } = this.props.match.params;

    fetch(`http://localhost:3001/api/v1/show/${show}`)
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
        this.setState({ seasons: show.seasons });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { seasons } = this.state;
    const { show } = this.props.match.params;

    return (
      <div style={{ maxWidth: "1200px", margin: "24px auto" }}>
        {seasons.length > 0 &&
          seasons
            .sort((a, b) => a.seasonNumber - b.seasonNumber)
            .map(season => (
              <Paper
                onClick={() =>
                  this.props.history.push(
                    `/admin/show/${show}/season/${season._id}`
                  )
                }
              >
                <img src={season.image.poster} alt={season.seasonName} />
                <Typography>
                  {season.seasonNumber}: {season.seasonName}
                </Typography>
                <Typography>{season.description}</Typography>
              </Paper>
            ))}

        {/*
        <Paper
          style={{
            margin: "24px auto",
            padding: "24px",
            maxWidth: 960
          }}
        >
          <Typography>
            <pre>{JSON.stringify(seasons, null, 4)}</pre>
          </Typography>
        </Paper>    
            */}
      </div>
    );
  }
}

export default SeasonList;
