import React from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import {
  episode as episodeApi,
  season as seasonApi
} from "../../../../api/hbo";

class EpisodeForm extends React.Component {
  state = {
    episode: {}
  };

  onSubmit = async values => {
    const { show, season, episode } = this.props.match.params;

    const data = JSON.stringify(values);

    if (episode) {
      // edit
      episodeApi
        .put(`/${episode}`, data)
        .then(res => {
          if (res.status !== 200) throw new Error(res.data);
          this.props.history.push(
            `/admin/show/${show}/season/${season}/episode`
          );
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // add
      episodeApi
        .post(`/${episode}`, data)
        .then(res => {
          if (res.status !== 201) throw new Error(res.data);
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
      episodeApi
        .get(`/${episode}`)
        .then(res => {
          if (res.status !== 200) throw new Error(res.data);
          this.setState({
            episode: { ...res.data }
          });
        })
        .catch(error => {
          console.log(error);
          this.props.history.push("/page_not_found");
        });
    }

    seasonApi
      .get(`/${season}`)
      .then(res => {
        if (res.status !== 200) throw new Error(res.data);
        this.setState({
          relatedSeason: res.data._id,
          relatedShow: res.data.relatedShow
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
      airDate,
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
            trailerUri,
            airDate
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

                <Grid item xs={12}>
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
