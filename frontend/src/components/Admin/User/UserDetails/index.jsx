import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";

class UserDetails extends React.Component {
  state = {};

  componentDidMount() {
    const userId = this.props.match.params.id;

    fetch(`http://localhost:3001/api/v1/user/${userId}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusTetx);
        }
        return response.json();
      })
      .then(user => {
        if (!user._id) {
          throw new Error("Bad resonse from the server");
        }

        this.setState({ ...user });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { _id, name, email, avatar, admin } = this.state;

    return (
      <div
        style={{
          margin: "24px auto",
          maxWidth: "600px"
        }}
      >
        <Typography>User details</Typography>

        {_id && (
          <Paper
            style={{
              padding: "24px",
              margin: "24px",
              float: "left",
              maxWidth: "300px"
            }}
          >
            <div
              style={{
                margin: "0 auto 24px",
                width: "100%"
              }}
            >
              <img
                src={avatar}
                alt={name}
                style={{
                  borderRadius: "50%"
                }}
              />
            </div>

            <Typography>ID: {_id}</Typography>
            <Typography>Name: {name}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Role: {admin ? "(admin)" : "(user)"}</Typography>
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Button
                color="secondary"
                variant="outlined"
                onClick={() =>
                  this.props.history.push(`/admin/user/${_id}/edit`)
                }
              >
                Edit
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  const token = localStorage.getItem("jwtToken");

                  fetch(`http://localhost:3001/api/v1/user/${_id}`, {
                    method: "DELETE",
                    headers: new Headers({
                      "Content-type": "application/json",
                      Authorization: token
                    })
                  }).then(response => {
                    if (response.status === 200) {
                      this.props.history.push("/admin/user");
                    } else {
                      console.log(response.statusText);
                    }
                  });
                }}
              >
                Delete
              </Button>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

export default UserDetails;
