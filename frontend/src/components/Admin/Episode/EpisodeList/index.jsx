import React from "react";
import { Paper, Typography, Link } from "@material-ui/core";
import { episode as episodeApi } from "../../../../api/hbo";

class EpisodeList extends React.Component {
  state = {
    episodes: {}
  };

  componentDidMount() {
    const { show } = this.props.match.params;

    episodeApi
      .get(`/${show}`)
      .then(res => {
        if (res.status !== 200) throw new Error(res.data);
        this.setState({ episodes: res.data.episodes });
      })
      .catch(error => {
        console.log(error);
        this.props.history.push("/path_not_found");
      });
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

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "start",
            maxWidth: "1600px",
            margin: "24px auto"
          }}
        >
          {episodes.length > 0 &&
            episodes.map(episode => (
              <Paper
                style={{
                  maxWidth: "500px",
                  margin: "24px auto",
                  width: "800px"
                }}
                onClick={() =>
                  this.props.history.push(
                    `/admin/show/${show}/season/${season}/episode/${
                      episode.excerpt
                    }`
                  )
                }
              >
                <img
                  style={{ width: "100%" }}
                  src={episode.image.still}
                  alt={episode.episodeName}
                />
                <div style={{ padding: "24px" }}>
                  <Typography component="h1" variant="title">
                    {episode.episodeNumber}: {episode.episodeName}
                  </Typography>
                  <Typography variant="subtitle1">
                    {episode.description}
                  </Typography>
                  <Typography variant="caption" align="right">
                    Air date: {new Date(episode.airDate).toLocaleDateString()}
                  </Typography>
                </div>
              </Paper>
            ))}
        </div>

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
