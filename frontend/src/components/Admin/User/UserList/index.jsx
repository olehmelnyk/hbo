import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";

import { user as userApi } from "../../../../api/hbo";

class User extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    userApi
      .get("/")
      .then(res => {
        if (!res.status === 200) {
          throw new Error(res.data);
        }
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.log(error);
        this.props.history.push("/page_not_found");
      });
  }

  render() {
    const { users } = this.state;

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
                      userApi
                        .delete(`/${user._id}`)
                        .then(res => {
                          if (!res.status !== 200) {
                            throw new Error(res.data);
                          }
                          this.setState({
                            users: users.filter(_user => _user._id !== user._id)
                          });
                        })
                        .catch(error => console.log(error));
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
