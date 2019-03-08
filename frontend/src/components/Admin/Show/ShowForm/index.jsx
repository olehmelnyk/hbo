import React from "react";

// const ShowForm = () => <div>show form</div>;
class ShowForm extends React.Component {
  state = {
    show: {}
  };

  componentDidMount() {
    const excerpt = this.props.match.params.id;

    if (excerpt) {
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
  }

  onSubmit = event => {
    event.preventDefault();

    const excerpt = this.props.match.params.id;
    const formData = new FormData(event.targdet);

    if (excerpt) {
      // edit
      fetch(`http://localhost:3001/api/v1/show/${excerpt}`, {
        method: "PUT",
        body: formData
      })
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.error);
          }
          return response.json();
        })
        .then(data => {
          if (!data._id) {
            throw new Error("Bad response");
          }
          this.props.history.push("/admin/show");
        })
        .catch(error => console.log(error));
    } else {
      // add
      fetch("http://localhost:3001/api/v1/show", {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.status !== 201) {
            throw new Error(response.error);
          }
          return response.json();
        })
        .then(data => {
          if (!data._id) {
            throw new Error("Bad response");
          }
          this.props.history.push("/admin/show");
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const { show } = this.state;
    return (
      <div>
        <h1>Form</h1>
        <pre>{JSON.stringify(show, null, 4)}</pre>
      </div>
    );
  }
}

export default ShowForm;
