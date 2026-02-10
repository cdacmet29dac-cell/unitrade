import { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { clearToken, getRole } from "../../utils/storage";

const drawerWidth = 260;

const DashboardLayout = ({ menuItems = [], children }) => {
  const [open, setOpen] = useState(false);
  const role = getRole();

  const logout = () => {
    clearToken();
    window.location.href = "/login";
  };

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight={700}>UniTrade</Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <LogoutIcon sx={{ mr: 1 }} />
            Logout
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0b1220", color: "#fff" }}>
      {/* Top bar */}
      <AppBar position="sticky" sx={{ bgcolor: "#0f172a" }}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>
            UniTrade <span style={{ color: "#f97316" }}>({role})</span>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Floating hamburger */}
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 2000,
          bgcolor: "#f97316",
          "&:hover": { bgcolor: "#ea580c" },
        }}
      >
        <MenuIcon />
      </Fab>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: "#020617",
            color: "#fff",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Page content */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
