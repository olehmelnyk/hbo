import React from "react";

import { Paper, Typography, Button } from "@material-ui/core";

class User extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/user")
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusTetx);
        }
        return response.json();
      })
      .then(users => {
        if (!Array.isArray(users)) {
          throw new Error("Bad resonse from the server");
        }

        this.setState({ users });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { users } = this.state;

    /*

    // user structure
    {
      "admin": false,
      "_id": "5c87828ff7ae944e38db54be",
      "name": "Anita",
      "email": "anita@gmail.com",
      "avatar": "//www.gravatar.com/avatar/b14e4a94fc689db51e24f7379c5c089d?s=200&r=pg&d=mm",
      "createdAt": "2019-03-12T09:57:36.030Z",
      "updatedAt": "2019-03-12T09:57:36.030Z",
      "__v": 0
    }
    
    */

    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "24px auto"
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => this.props.history.push("/admin/user/add")}
          fullWidth
        >
          New user
        </Button>

        {users.length > 0 &&
          users
            .sort((a, b) => b.admin - a.admin)
            .map(user => (
              <Paper
                key={user._id}
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
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      borderRadius: "50%"
                    }}
                  />
                </div>

                <Typography>ID: {user._id}</Typography>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>
                  Role: {user.admin ? "(admin)" : "(user)"}
                </Typography>
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
                      this.props.history.push(`/admin/user/${user._id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      const token = localStorage.getItem("jwtToken");

                      fetch(`http://localhost:3001/api/v1/user/${user._id}`, {
                        method: "DELETE",
                        headers: new Headers({
                          "Content-type": "application/json",
                          Authorization: token
                        })
                      }).then(response => {
                        if (response.status === 200) {
                          this.setState({
                            users: users.filter(_user => _user._id !== user._id)
                          });
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
            ))}
      </div>
    );
  }
}

export default User;
