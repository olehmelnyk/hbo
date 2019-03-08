/*
    This page renders list of all tv-shows
*/
import React from "react";

class ShowList extends React.Component {
  state = {
    shows: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/show")
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(shows => {
        if (!Array.isArray(shows) || shows.length < 1) {
          throw new Error("No shows to display");
        } else {
          this.setState({ shows });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { shows } = this.state;

    return (
      <div>
        <h1>Page that show list of all TV-shows (not just feature ones)</h1>
        <div>
          {shows && shows.length ? (
            /* here you have data from server */
            <pre>{JSON.stringify(shows, null, 4)}</pre>
          ) : (
            "No shows - nothing to display :("
          )}
        </div>
      </div>
    );
  }
}

export default ShowList;
