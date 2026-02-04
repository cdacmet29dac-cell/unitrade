import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRoutes from "./routes";
import Header from "../components/common/Header";
import theme from "../theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-shell">
        <Header />
        <main className="app-content">
          <AppRoutes />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
