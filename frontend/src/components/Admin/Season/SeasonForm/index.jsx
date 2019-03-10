import React from "react";
import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";
import { Typography, Paper, Grid, Button, MenuItem } from "@material-ui/core";

class SeasonForm extends React.Component {
  state = {
    season: {}
  };

  onSubmit = async values => {
    const { show, season } = this.props.match.params;

    if (season) {
      // edit
      fetch(`http://localhost:3001/api/v1/season/${season}`, {
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
          this.props.history.push(`/admin/show/${show}/season`);
        })
        .catch(error => console.log(error));
    } else {
      // add
      fetch("http://localhost:3001/api/v1/season", {
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
          this.props.history.push(`/admin/show/${show}/season`);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  validate = values => {
    const errors = {};
    if (!values.seasonName) {
      errors.seasonName = "Required";
    }
    if (!values.seasonNumber) {
      errors.seasonNumber = "Required";
    }
    if (!values.relatedShow) {
      errors.relatedShow = "Required";
    }
    return errors;
  };

  componentDidMount() {
    const excerpt = this.props.match.params.season;

    if (excerpt) {
      fetch(`http://localhost:3001/api/v1/season/${excerpt}`)
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(season => {
          if (!season._id) {
            throw new Error("Bad response from the server");
          }

          if (season.airDate) {
            season.airDate = season.airDate.slice(0, 10);
          }

          this.setState({ season });
        })
        .catch(error => {
          console.log(error);
          this.props.history.push("/page_not_found");
        });
    }

    // get the list of all shows - we need _id and titles
    fetch(`http://localhost:3001/api/v1/show`)
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
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {
      season: {
        seasonName,
        seasonNumber,
        relatedShow,
        description,
        image,
        trailerUri,
        airDate,
        _id
      },
      shows
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
          {_id ? `Edit "${seasonName}"` : "New Season"}
        </Typography>

        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            seasonName,
            seasonNumber,
            relatedShow,
            description,
            image,
            trailerUri,
            airDate
          }}
          validate={this.validate}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid container alignItems="flex-start" spacing={24}>
                <Grid item xs={10}>
                  <Field
                    fullWidth
                    required
                    name="seasonName"
                    component={TextField}
                    type="text"
                    label="Season name"
                  />
                </Grid>

                <Grid item xs={2}>
                  <Field
                    fullWidth
                    required
                    name="seasonNumber"
                    component={TextField}
                    type="number"
                    label="Season number"
                    min={1}
                    max={35}
                    step={1}
                  />
                </Grid>

                <Grid item xs={8}>
                  <Field
                    fullWidth
                    name="relatedShow"
                    component={Select}
                    label="Related show"
                    formControlProps={{ fullWidth: true }}
                  >
                    {shows &&
                      shows.map(show => (
                        <MenuItem value={show._id} key={show._id}>
                          {show.title}
                        </MenuItem>
                      ))}
                  </Field>
                </Grid>

                <Grid item xs={4}>
                  <Field
                    fullWidth
                    required
                    name="airDate"
                    component={TextField}
                    type="date"
                    label="Air date"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="description"
                    component={TextField}
                    type="text"
                    multiline
                    label="Description"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="image.poster"
                    component={TextField}
                    type="url"
                    label="Poster image"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="image.backdrop"
                    component={TextField}
                    type="url"
                    label="Backdrop image"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="image.still"
                    component={TextField}
                    type="url"
                    label="Still image"
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

export default SeasonForm;
