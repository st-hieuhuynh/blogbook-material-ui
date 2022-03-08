import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      "xs" : 480,
      "sm" : 770,
      "md": 960,
      "lg": 1024,
      "xl": 1270,
    },
  },
  palette: {
    primary: {
      main: "#0078ff",
      dark: "#005de7"
    },
    error: {
      main: "#dc3545"
    },
    success: {
      main: "#198754"
    },
    warning: {
      main: "#f9bb00"
    }
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 16,
    fontFamily: [
      "Inter", "sans-serif"
    ].join(','),
  }
})