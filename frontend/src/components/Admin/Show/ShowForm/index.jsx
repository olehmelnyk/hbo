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
import { show as showApi } from "../../../../api/hbo";

class ShowForm extends React.Component {
  state = {
    show: {}
  };

  onSubmit = async values => {
    values.genres = values.genres.split(",");

    const excerpt = this.props.match.params.id;

    const data = JSON.stringify(values);

    if (excerpt) {
      // edit

      showApi
        .put(`/${excerpt}`, data)
        .then(res => {
          if (res.status !== 200) throw new Error(res.data);
          this.props.history.push("/admin/show");
        })
        .catch(error => console.log(error));
    } else {
      // add

      showApi
        .post("/", data)
        .then(res => {
          if (res.status !== 201) throw new Error(res.data);
          this.props.history.push("/admin/show");
        })
        .catch(error => console.log(error));
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
    if (!values.firstAirDate) {
      errors.firstAirDate = "Required";
    }
    return errors;
  };

  componentDidMount() {
    const excerpt = this.props.match.params.id;

    if (excerpt) {
      showApi
        .get(`/${excerpt}`)
        .then(res => {
          if (res.statusText !== 200) throw new Error(res.data);

          const show = res.data;

          if (show.firstAirDate) {
            show.firstAirDate = show.firstAirDate.slice(0, 10);
          }

          if (show.lastAirDate) {
            show.lastAirDate = show.lastAirDate.slice(0, 10);
          }

          show.genres = show.genres.join(", ");

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
        image,
        firstAirDate,
        lastAirDate,
        trailerUri,
        priority,
        episodeRunTime,
        numberOfSeasons,
        numberOfEpisodes,
        status,
        inProduction,
        genres,
        _id
      }
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
          {_id ? `Edit "${title}"` : "New Show"}
        </Typography>

        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            title,
            subtitle,
            image,
            firstAirDate,
            lastAirDate,
            trailerUri,
            priority,
            episodeRunTime,
            numberOfSeasons,
            numberOfEpisodes,
            status,
            inProduction,
            genres
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
                    label="Start date"
                    title="Start date"
                    InputLabelProps={{
                      shrink: true
                    }}
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
                    name="genres"
                    component={TextField}
                    type="text"
                    label="Genres"
                  />
                </Grid>

                <Grid item xs={2}>
                  <Field
                    fullWidth
                    name="episodeRunTime"
                    component={TextField}
                    type="text"
                    label="Episode run time"
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    fullWidth
                    name="numberOfSeasons"
                    component={TextField}
                    type="number"
                    label="Number of Seasons"
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    fullWidth
                    name="numberOfEpisodes"
                    component={TextField}
                    type="numberOfEpisodes"
                    label="Number of Episodes"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="status"
                    component={TextField}
                    type="text"
                    label="Status"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="firstAirDate"
                    component={TextField}
                    type="date"
                    label="First aired date"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="lastAirDate"
                    component={TextField}
                    type="date"
                    label="Last aired date"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
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

                <Grid item xs={6}>
                  <FormControlLabel
                    label="In Production"
                    control={
                      <Field
                        name="inProduction"
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

export default ShowForm;
