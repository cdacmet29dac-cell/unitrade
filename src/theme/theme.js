import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#10B981",
    },
    background: {
      default: "#0B1220",
      paper: "#111A2E",
    },
    text: {
      primary: "#F8FAFC",
      secondary: "#CBD5F5",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "\"Inter\", \"Segoe UI\", system-ui, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;
