import React from "react";
import { Typography, Button } from "@material-ui/core";

const NotFound = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <Typography
        component="h1"
        variant="h1"
        style={{
          fontSize: "16em"
        }}
      >
        404
      </Typography>
      <Typography component="h2" variant="h2">
        Page not found
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => props.history.goBack()}
        style={{
          margin: "24px"
        }}
      >
        Go back
      </Button>
    </div>
  );
};

export default NotFound;
