import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";

const menuItems = [
  { label: "Dashboard", icon: <Inventory2Icon />, path: "/student" },
  { label: "Marketplace", icon: <StorefrontIcon />, path: "/marketplace" },
  { label: "AI Bot", icon: <AutoAwesomeIcon />, path: "/chatbot" },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout menuItems={menuItems}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Welcome back, Student
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your listings, requests, and saved components.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatCard icon={<Inventory2Icon color="primary" />} label="My Listings" value="08" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard icon={<RequestPageIcon color="primary" />} label="My Requests" value="12" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard icon={<FavoriteIcon color="primary" />} label="Saved Items" value="05" />
          </Grid>
        </Grid>

        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
                Create Listing
              </Button>
              <Button variant="outlined" color="secondary" startIcon={<StorefrontIcon />}>
                Browse Marketplace
              </Button>
              <Button variant="text" startIcon={<AutoAwesomeIcon />}>
                Try AI Bot
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ bgcolor: "background.paper" }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent activity
            </Typography>
            <List>
              {[
                "Request approved for Arduino Nano kit.",
                "New listing submitted for verification.",
                "Saved Raspberry Pi sensor bundle.",
              ].map((item) => (
                <ListItem key={item} divider>
                  <ListItemText primary={item} secondary="2 hours ago" />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Stack>
    </DashboardLayout>
  );
};

export default StudentDashboard;
