/*
    This page renders page with all info regarding tv-show, including seasons and episode lists
*/
import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { show as showApi } from "../../../../api/hbo";

class ShowDetails extends React.Component {
  state = {
    show: {}
  };

  componentDidMount() {
    const excerpt = this.props.match.params.id;

    showApi
      .get(`/${excerpt}`)
      .then(res => {
        if (res.status !== 200) throw new Error(res.data);
        this.setState({ show: res.data });
      })
      .catch(error => {
        console.log(error);
        this.props.history.push("/page_not_found");
      });
  }

  render() {
    const { show } = this.state;

    return (
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
        <Typography component="h2" variant="h5">
          {show.subtitle}
        </Typography>
        <div>
          {show._id ? <pre>{JSON.stringify(show, null, 4)}</pre> : "Loading..."}
        </div>
      </Paper>
    );
  }
}

export default ShowDetails;
