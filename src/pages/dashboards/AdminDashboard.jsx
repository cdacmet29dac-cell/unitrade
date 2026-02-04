import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";

const menuItems = [
  { label: "Dashboard", icon: <AssignmentIcon />, path: "/admin-dashboard" },
  { label: "Marketplace", icon: <AssignmentIcon />, path: "/marketplace" },
  { label: "Notes", icon: <AssignmentIcon />, path: "/notes" },
];

const approvals = [
  { id: 1, item: "Logic Analyzer", status: "Approved", time: "15 min ago" },
  { id: 2, item: "Embedded Toolkit", status: "Approved", time: "45 min ago" },
  { id: 3, item: "Power Supply", status: "Approved", time: "2 hours ago" },
];

const users = [
  { id: 1, name: "Arjun K.", role: "Student", listings: 3 },
  { id: 2, name: "Meera S.", role: "HOD", listings: 1 },
  { id: 3, name: "Isha M.", role: "Student", listings: 5 },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout menuItems={menuItems}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Admin overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor marketplace health, approvals, and user activity.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatCard icon={<AssignmentIcon color="primary" />} label="Total Listings" value="412" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard icon={<PeopleIcon color="primary" />} label="Pending Approvals" value="26" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard icon={<SwapHorizIcon color="primary" />} label="Transactions" value="188" />
          </Grid>
        </Grid>

        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent approvals
            </Typography>
            <Stack spacing={1}>
              {approvals.map((item) => (
                <Stack
                  key={item.id}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography>{item.item}</Typography>
                  <Typography color="text.secondary">{item.time}</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Users
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Listings</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.listings}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="secondary" size="small">
                        Block
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Stack>
    </DashboardLayout>
  );
};

export default AdminDashboard;
