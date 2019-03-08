import React from "react";

// const ShowList = () => <div>show list</div>;
class ShowList extends React.Component {
  state = {
    shows: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/show")
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(shows => {
        if (!Array.isArray(shows)) {
          throw new Error("Bad response from the server");
        }
        this.setState({ shows });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { shows } = this.state;

    return <pre>{JSON.stringify(shows, null, 4)}</pre>;
  }
}

export default ShowList;
