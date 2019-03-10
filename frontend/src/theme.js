import { createMuiTheme } from "@material-ui/core/styles";
import { red, yellow, grey } from "@material-ui/core/colors";

// https://material-ui.com/customization/themes/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[900]
    },
    secondary: {
      main: yellow[500]
    },
    type: "light"
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
