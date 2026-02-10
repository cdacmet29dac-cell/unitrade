import { useState } from "react";
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
  Tabs,
  Tab,
  Typography,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";

const menuItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Notes", path: "/notes" },
  { label: "Add Notes", path: "/admin/notes-upload" }, // ✅ THIS
];

/* ---------------- TEMP DATA (SAFE TO REPLACE WITH API) ---------------- */

const stats = {
  users: 124,
  products: 412,
  pending: 26,
};

const users = [
  { id: 1, name: "Arjun K.", role: "STUDENT", status: "ACTIVE" },
  { id: 2, name: "Meera S.", role: "HOD", status: "ACTIVE" },
  { id: 3, name: "Isha M.", role: "STUDENT", status: "BLOCKED" },
];

const verifications = [
  { id: 1, name: "Rahul P.", status: "PENDING" },
  { id: 2, name: "Sneha M.", status: "APPROVED" },
];

const products = [
  { id: 1, title: "Logic Analyzer", status: "LIVE" },
  { id: 2, title: "Power Supply", status: "REJECTED" },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);

  return (
    <DashboardLayout menuItems={menuItems}>
      <Stack spacing={4}>
        {/* ---------------- HEADER ---------------- */}
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Admin Control Panel
          </Typography>
          <Typography color="text.secondary">
            Full system visibility and moderation
          </Typography>
        </Box>

        {/* ---------------- TABS ---------------- */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Overview" />
          <Tab label="Users" />
          <Tab label="Student Verifications" />
          <Tab label="Products" />
        </Tabs>

        {/* ================= OVERVIEW ================= */}
        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StatCard
                icon={<PeopleIcon color="primary" />}
                label="Total Users"
                value={stats.users}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <StatCard
                icon={<InventoryIcon color="primary" />}
                label="Total Products"
                value={stats.products}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <StatCard
                icon={<AssignmentIcon color="primary" />}
                label="Pending Approvals"
                value={stats.pending}
              />
            </Grid>
          </Grid>
        )}

        {/* ================= USERS ================= */}
        {tab === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Users
              </Typography>

              <Box sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.role}</TableCell>
                        <TableCell>{u.status}</TableCell>
                        <TableCell align="right">
                          <Button size="small" variant="outlined">
                            {u.status === "ACTIVE" ? "Block" : "Unblock"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* ================= STUDENT VERIFICATIONS ================= */}
        {tab === 2 && (
          <Stack spacing={2}>
            {verifications.map((v) => (
              <Card key={v.id}>
                <CardContent>
                  <Typography fontWeight={600}>{v.name}</Typography>
                  <Typography color="text.secondary">
                    Status: {v.status}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {/* ================= PRODUCTS ================= */}
        {tab === 3 && (
          <Stack spacing={2}>
            {products.map((p) => (
              <Card key={p.id}>
                <CardContent>
                  <Typography fontWeight={600}>{p.title}</Typography>
                  <Typography color="text.secondary">
                    Status: {p.status}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </DashboardLayout>
  );
};

export default AdminDashboard;
