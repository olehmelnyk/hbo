import { createMuiTheme } from "@material-ui/core/styles";
import { red, green, grey } from "@material-ui/core/colors";

// https://material-ui.com/customization/themes/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[900]
    },
    secondary: {
      main: green[500]
    }
  },

  typography: {
    useNextVariants: true // https://material-ui.com/style/typography/#migration-to-typography-v2
  },

  overrides: {
    MuiButton: {
      text: {
        color: grey[50]
      }
    }
  }
});

export default theme;
