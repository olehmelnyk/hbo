import React from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Typography, Paper, Grid, Button } from "@material-ui/core";

class EpisodeForm extends React.Component {
  state = {
    episode: {}
  };

  onSubmit = async values => {
    const { show, season, episode } = this.props.match.params;

    if (episode) {
      // edit
      fetch(`http://localhost:3001/api/v1/episode/${episode}`, {
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
          this.props.history.push(
            `/admin/show/${show}/season/${season}/episode`
          );
        })
        .catch(error => console.log(error));
    } else {
      // add
      fetch("http://localhost:3001/api/v1/episode", {
        method: "POST",
        body: JSON.stringify(values),
        headers: new Headers({ "Content-type": "application/json" })
      })
        .then(response => {
          if (response.status !== 201) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          if (!data._id) {
            throw new Error("Bad response");
          }
          this.props.history.push(
            `/admin/show/${show}/season/${season}/episode`
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  validate = values => {
    const errors = {};
    if (!values.episodeName) {
      errors.episodeName = "Required";
    }
    if (!values.episodeNumber) {
      errors.episodeNumber = "Required";
    }
    return errors;
  };

  componentDidMount() {
    const { season, episode } = this.props.match.params;

    if (episode) {
      fetch(`http://localhost:3001/api/v1/episode/${episode}`)
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(episode => {
          if (!episode._id) {
            throw new Error("Bad response from the server");
          }

          this.setState({
            ...episode
          });
        })
        .catch(error => {
          console.log(error);
          this.props.history.push("/page_not_found");
        });
    }

    fetch(`http://localhost:3001/api/v1/season/${season}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(season => {
        if (!season._id) {
          throw new Error("Bad response from server");
        }

        this.setState({
          relatedSeason: season._id,
          relatedShow: season.relatedShow
        });
      })
      .catch(error => {
        console.log(error);
        this.props.history.push("/page_not_found");
      });
  }

  render() {
    const {
      episodeName,
      episodeNumber,
      relatedShow,
      relatedSeason,
      description,
      image,
      trailerUri,
      _id
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
          {_id ? `Edit "${episodeName}"` : "New Episode"}
        </Typography>

        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            episodeName,
            episodeNumber,
            relatedShow,
            relatedSeason,
            description,
            image,
            trailerUri
          }}
          validate={this.validate}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={10}>
                  <Field
                    fullWidth
                    required
                    name="episodeName"
                    component={TextField}
                    type="text"
                    label="Episode name"
                  />
                </Grid>

                <Grid item xs={2}>
                  <Field
                    fullWidth
                    required
                    name="episodeNumber"
                    component={TextField}
                    type="number"
                    label="Episode number"
                    min={1}
                    max={35}
                    step={1}
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

export default EpisodeForm;
