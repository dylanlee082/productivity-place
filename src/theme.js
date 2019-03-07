import { createMuiTheme } from "@material-ui/core/styles";
import { grey, brown } from "@material-ui/core/colors";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        textTransform: "none"
      }
    },
    MuiDialogTitle: {
      root: {
        textAlign: "left",
        fontSize: "1.3em"
      }
    },
    MuiDialogContentText: {
      root: {
        textAlign: "left"
      }
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Open Sans"
  },
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
