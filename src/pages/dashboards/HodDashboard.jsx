import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";

const menuItems = [
  { label: "Dashboard", icon: <AssignmentIcon />, path: "/hod-dashboard" },
  { label: "Notes", icon: <AssignmentIcon />, path: "/notes" },
  { label: "Marketplace", icon: <AssignmentIcon />, path: "/marketplace" },
];

const verificationItems = [
  { id: 1, title: "ESP32 Starter Kit", owner: "Aditi N.", status: "Pending" },
  { id: 2, title: "Digital Oscilloscope", owner: "Rohan P.", status: "Pending" },
  { id: 3, title: "Sensor Pack", owner: "Meera S.", status: "Pending" },
];

const HodDashboard = () => {
  return (
    <DashboardLayout menuItems={menuItems}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Verification queue
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review and approve listings before they go live.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatCard icon={<AssignmentIcon color="primary" />} label="Pending" value="14" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard icon={<CheckCircleIcon color="primary" />} label="Approved" value="86" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard icon={<CancelIcon color="primary" />} label="Rejected" value="09" />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2}>
          {["Pending", "Approved", "Rejected"].map((status) => (
            <Chip key={status} label={status} color={status === "Pending" ? "secondary" : "default"} />
          ))}
        </Stack>

        <Grid container spacing={3}>
          {verificationItems.map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
              <Card sx={{ bgcolor: "background.paper" }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Listed by {item.owner}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button variant="contained" startIcon={<CheckCircleIcon />}>
                        Approve
                      </Button>
                      <Button variant="outlined" color="secondary" startIcon={<CancelIcon />}>
                        Reject
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </DashboardLayout>
  );
};

export default HodDashboard;
