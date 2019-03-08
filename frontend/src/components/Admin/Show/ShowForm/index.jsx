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

class ShowForm extends React.Component {
  state = {
    show: {}
  };

  onSubmit = async values => {
    const excerpt = this.props.match.params.id;
    if (excerpt) {
      // edit
      fetch(`http://localhost:3001/api/v1/show/${excerpt}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: new Headers({ "Content-type": "application/json" })
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
        body: JSON.stringify(values),
        headers: new Headers({ "Content-type": "application/json" })
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
        .catch(error => {
          console.log(error);
        });
    }
  };

  validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.subtitle) {
      errors.subtitle = "Required";
    }
    if (!values.startDate) {
      errors.startDate = "Required";
    }
    return errors;
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

          if (show.startDate) {
            show.startDate = show.startDate.slice(0, 10);
          }

          if (show.endDate) {
            show.endDate = show.endDate.slice(0, 10);
          }

          this.setState({ show });
        })
        .catch(error => {
          console.log(error);
          this.props.history.push("/page_not_found");
        });
    }
  }

  render() {
    const {
      show: {
        title,
        subtitle,
        description,
        image,
        startDate,
        endDate,
        trailerUri,
        priority,
        _id
      }
    } = this.state;

    return (
      <Paper>
        <Typography
          component="h1"
          variant="h4"
          style={{ marginBottom: "24px" }}
        >
          {_id ? `Edit "${title}"` : "New Show"}
        </Typography>

        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            title,
            subtitle,
            description,
            image,
            startDate,
            endDate,
            trailerUri,
            priority
          }}
          validate={this.validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="title"
                    component={TextField}
                    type="text"
                    label="Title"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="subtitle"
                    component={TextField}
                    type="text"
                    label="Subtitle"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="description.short"
                    component={TextField}
                    type="text"
                    multiline
                    label="Short description"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="description.long"
                    component={TextField}
                    type="text"
                    multiline
                    label="Long description"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="startDate"
                    component={TextField}
                    type="date"
                    label="Start date"
                    title="Start date"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="endDate"
                    component={TextField}
                    type="date"
                    label="End date"
                    title="End date"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="trailerUri"
                    component={TextField}
                    type="url"
                    label="Trailer video URL"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="image.square"
                    component={TextField}
                    type="url"
                    label="Square image URL"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="image.wide"
                    component={TextField}
                    type="url"
                    label="Wide image URL"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="image.extraWide"
                    component={TextField}
                    type="url"
                    label="Extra wide image URL"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    label="Featured"
                    control={
                      <Field
                        name="priority"
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
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
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

export default ShowForm;
