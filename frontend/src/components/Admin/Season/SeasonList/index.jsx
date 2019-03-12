import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { season as seasonApi } from "../../../../api/hbo";

class SeasonList extends React.Component {
  state = {
    seasons: {}
  };

  componentDidMount() {
    const { show } = this.props.match.params;

    seasonApi
      .get(`/${show}`)
      .then(res => {
        if (res.status !== 200) throw new Error(res.data);

        this.setState({ seasons: res.seasons });
      })
      .catch(error => {
        console.log(error);
        this.props.history.push("/page_not_found");
      });
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
      </div>
    );
  }
}

export default SeasonList;
