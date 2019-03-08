import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./theme";
import Router from "./router";

const HBO = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <Router {...props} />
      </CssBaseline>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<HBO />, document.getElementById("root"));
