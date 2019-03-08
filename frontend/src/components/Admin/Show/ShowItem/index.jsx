import React from "react";
import { Paper, Typography } from "@material-ui/core";

// const ShowItem = () => <div>show item</div>;
class ShowItem extends React.Component {
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

    return (
      <Paper
        style={{
          margin: "24px auto"
        }}
      >
        <Typography component="h1" variant="h4">
          {show.title}
        </Typography>
        <Typography>
          <pre>{JSON.stringify(show, null, 4)}</pre>
        </Typography>
      </Paper>
    );
  }
}

export default ShowItem;
