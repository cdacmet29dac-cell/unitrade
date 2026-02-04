import { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { clearToken, getRole } from "../../utils/storage";

const drawerWidth = 260;

const DashboardLayout = ({ menuItems = [], children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = (getRole() || "guest").toUpperCase();

  const handleLogout = () => {
    clearToken();
    window.location.href = "/login";
  };

  const navList = (
    <List sx={{ px: 1 }}>
      {menuItems.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton
            component={NavLink}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.active": {
                bgcolor: "rgba(37, 99, 235, 0.2)",
                color: "primary.main",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="fixed" elevation={0} color="transparent">
        <Toolbar sx={{ px: { xs: 2, md: 4 }, justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              UniTrade
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Badge
              color="secondary"
              badgeContent={role}
              sx={{
                "& .MuiBadge-badge": {
                  right: -16,
                  top: 6,
                  padding: "0 10px",
                  borderRadius: 20,
                },
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Role
              </Typography>
            </Badge>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          pt: { xs: 7, md: 8 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: "background.paper",
            },
          }}
        >
          {navList}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: "background.paper",
              borderRight: "1px solid rgba(148, 163, 184, 0.2)",
            },
          }}
          open
        >
          <Toolbar />
          {navList}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, md: 4 },
          pb: 6,
          pt: { xs: 10, md: 12 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
