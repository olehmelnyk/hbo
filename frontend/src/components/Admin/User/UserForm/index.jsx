import React from "react";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Grid,
  Button,
  FormControlLabel
} from "@material-ui/core";

class UserForm extends React.Component {
  state = {
    user: {}
  };

  onSubmit = async values => {
    const userId = this.props.match.params.id;

    if (userId) {
      // edit
      fetch(`http://localhost:3001/api/v1/user/${userId}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: localStorage.getItem("jwtToken")
        })
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
          this.props.history.push("/admin/user");
        })
        .catch(error => console.log(error));
    } else {
      // add
      fetch("http://localhost:3001/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: localStorage.getItem("jwtToken")
        })
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
          this.props.history.push("/admin/user");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }

    return errors;
  };

  componentDidMount() {
    const userId = this.props.match.params.id;

    if (userId) {
      fetch(`http://localhost:3001/api/v1/user/${userId}`)
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(user => {
          if (!user._id) {
            throw new Error("Bad response from the server");
          }

          this.setState({ user });
        })
        .catch(error => {
          console.log(error);
          this.props.history.push("/page_not_found");
        });
    }
  }

  render() {
    const {
      user: { _id, admin, email, name }
    } = this.state;

    return (
      <Paper
        style={{
          margin: "24px auto",
          padding: "24px",
          maxWidth: 960
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          style={{ marginBottom: "24px" }}
        >
          {_id ? `Edit "${email}"` : "New user"}
        </Typography>

        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            _id,
            admin,
            email,
            name
          }}
          validate={this.validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="email"
                    component={TextField}
                    type="email"
                    label="Email"
                  />
                </Grid>

                {_id ? (
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="_id"
                      component={TextField}
                      type="text"
                      label="ID"
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Grid>
                ) : (
                  <div>
                    <Field
                      fullWidth
                      name="password"
                      component={TextField}
                      type="password"
                      label="Password"
                    />

                    <Field
                      fullWidth
                      name="password_confirm"
                      component={TextField}
                      type="password"
                      label="Password confirm"
                    />
                  </div>
                )}

                <Grid item xs={12}>
                  <FormControlLabel
                    label="Admin"
                    control={
                      <Field
                        name="admin"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                  />
                </Grid>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "24px"
                  }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    onClick={this.props.history.goBack}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </form>
          )}
        />
      </Paper>
    );
  }
}

export default UserForm;
