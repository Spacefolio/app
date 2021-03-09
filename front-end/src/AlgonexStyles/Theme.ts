import { createMuiTheme } from "@material-ui/core";
import { COLORS } from ".";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primaryBase,
    },
    secondary: {
      main: COLORS.accentBase,
    },
  },
});
