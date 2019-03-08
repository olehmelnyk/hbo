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
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.history.go("-2")}
          style={{
            margin: "24px",
            width: 120
          }}
        >
          Go back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.history.push("/")}
          style={{
            margin: "24px",
            width: 120
          }}
        >
          Main page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
