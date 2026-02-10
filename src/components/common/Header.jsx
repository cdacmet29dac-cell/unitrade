import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LOGO */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            textDecoration: "none",
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          UniTrade
        </Typography>

        {/* NAV */}
        <Stack direction="row" spacing={3}>
          <Link to="/notes">Notes</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/chatbot">AI Bot</Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
