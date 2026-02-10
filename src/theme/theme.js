import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    /* 🎯 Brand */
    primary: {
      main: "#7C7AE6", // Lavender Blue
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#22D3EE", // Cyan accent
    },

    success: {
      main: "#4ADE80",
    },

    warning: {
      main: "#FACC15",
    },

    error: {
      main: "#F87171",
    },

    /* 🧱 Backgrounds */
    background: {
      default: "#0B1020", // Main app background
      paper: "#121933", // Cards / modals
    },

    divider: "rgba(148,163,184,0.15)",

    /* 📝 TEXT (FIXED VISIBILITY) */
    text: {
      primary: "#F8FAFC", // Almost white
      secondary: "#94A3B8", // Muted bluish gray (VISIBLE)
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',

    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },

    body1: {
      fontSize: "0.95rem",
      color: "#CBD5E1",
    },

    body2: {
      fontSize: "0.85rem",
      color: "#94A3B8",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.3px",
    },
  },

  components: {
    /* 🧩 Cards */
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(148,163,184,0.12)",
          boxShadow: "0px 20px 40px rgba(0,0,0,0.45)",
        },
      },
    },

    /* 🔘 Buttons */
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: 18,
          paddingBlock: 10,
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #7C7AE6, #22D3EE)",
          boxShadow: "0px 10px 25px rgba(124,122,230,0.45)",
        },
      },
    },

    /* ✏ Inputs */
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#0F172A",
            borderRadius: 14,
          },
        },
      },
    },

    /* 📊 Tables */
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#020617",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(148,163,184,0.12)",
        },
        head: {
          fontWeight: 600,
          color: "#E5E7EB",
        },
      },
    },

    /* 🧭 AppBar */
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0B1020",
          borderBottom: "1px solid rgba(148,163,184,0.15)",
        },
      },
    },

    /* 📂 Drawer / Sidebar */
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0F172A",
          borderRight: "1px solid rgba(148,163,184,0.15)",
        },
      },
    },
  },
});

export default theme;
