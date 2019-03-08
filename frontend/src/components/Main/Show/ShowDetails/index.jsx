/*
    This page renders page with all info regarding tv-show, including seasons and episode lists
*/
import React from "react";

class ShowDetails extends React.Component {
  state = {
    show: {}
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`http://localhost:3001/api/v1/show/${id}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(show => {
        if (typeof show !== "object" || !show._id) {
          console.log(show);
          throw new Error("Bad data from server");
        }

        this.setState({ show });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { show } = this.state;

    return Object.entries(show).length > 0 ? (
      <pre>{JSON.stringify(show, null, 4)}</pre>
    ) : (
      "nothing to show"
    );
  }
}

export default ShowDetails;
