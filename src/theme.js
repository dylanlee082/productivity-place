import { createMuiTheme } from "@material-ui/core/styles";
import { grey, brown } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[50],
      main: grey[800]
    },
    secondary: {
      main: brown[100]
    }
  }
});

export default theme;
