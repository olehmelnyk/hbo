import React from "react";
import { Paper, Typography, Link } from "@material-ui/core";

class EpisodeList extends React.Component {
  state = {
    episodes: {}
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
        this.setState({ episodes: show.episodes });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { episodes } = this.state;
    const { show, season } = this.props.match.params;

    return (
      <div>
        <Paper
          style={{
            margin: "24px auto",
            padding: "24px",
            maxWidth: 960
          }}
        >
          <Typography style={{ textTransform: "uppercase" }}>
            <Link color="secondary" href="/admin">
              {" "}
              admin{" "}
            </Link>{" "}
            /{" "}
            <Link color="secondary" href="/admin/show">
              shows
            </Link>{" "}
            /{" "}
            <Link color="secondary" href={`/admin/show/${show}`}>
              {show}
            </Link>{" "}
            /{" "}
            <Link color="secondary" href={`/admin/show/${show}/season`}>
              seasons
            </Link>{" "}
            /{" "}
            <Link
              color="secondary"
              href={`/admin/show/${show}/season/${season}`}
            >
              {season}
            </Link>{" "}
            / episodes
          </Typography>
        </Paper>
        <Paper
          style={{
            margin: "24px auto",
            padding: "24px",
            maxWidth: 960
          }}
        >
          <Typography>
            <pre>{JSON.stringify(episodes, null, 4)}</pre>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default EpisodeList;
