import { createMuiTheme } from "@material-ui/core";
import { COLORS } from ".";

export const theme = createMuiTheme({
  typography: {},
  palette: {
    primary: {
      main: COLORS.primaryBase,
    },
    secondary: {
      main: COLORS.accentBase,
    },
  },
  overrides: {
    MuiTabs: {
      indicator: {
        left: 0,
        transition: "none",
      },
    },
    MuiTab: {
      root: {
        height: "80px",
        textTransform: "none",
      },
      wrapper: {
        cursor: "pointer",
        justifyContent: "start",
        alignItems: "start",
      },
    },
    MuiButton: {
      root: { color: "black" },
    },
  },
});
