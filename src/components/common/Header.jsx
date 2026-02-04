import { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { getRole } from "../../utils/storage";

const navLinks = [
  { label: "Notes", to: "/notes" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "AI Bot", to: "/chatbot" },
  { label: "Login", to: "/login" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const role = (getRole() || "").toLowerCase();
  const visibleLinks = role === "hod" || role === "admin"
    ? [...navLinks.slice(0, 3), { label: "HOD", to: "/hod" }, navLinks[3]]
    : navLinks;

  const drawerContent = useMemo(
    () => (
      <Box sx={{ width: 260, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          UniTrade
        </Typography>
        <Stack spacing={1}>
          {visibleLinks.map((link) => (
            <Button
              key={link.label}
              component={NavLink}
              to={link.to}
              onClick={() => setOpen(false)}
              sx={{
                justifyContent: "flex-start",
                color: "text.primary",
                "&.active": { color: "primary.main" },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Box>
    ),
    [visibleLinks]
  );

  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar sx={{ px: { xs: 2, md: 6 } }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          UniTrade
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {visibleLinks.map((link) => (
            <Button
              key={link.label}
              component={NavLink}
              to={link.to}
              sx={{
                color: "text.primary",
                "&.active": { color: "primary.main" },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
        <IconButton
          color="inherit"
          edge="end"
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Header;
