import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  const updateStatus = async (userId, status) => {
    await api.put(`/admin/users/${userId}/status?status=${status}`);
    setUsers(users.map((u) => (u.id === userId ? { ...u, status } : u)));
  };

  return (
    <DashboardLayout role="ROLE_ADMIN">
      <Typography variant="h5" fontWeight={700} mb={3}>
        User Management
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role.name}</TableCell>

              <TableCell>
                <Chip
                  label={u.status}
                  color={
                    u.status === "APPROVED"
                      ? "success"
                      : u.status === "PENDING"
                        ? "warning"
                        : "error"
                  }
                />
              </TableCell>

              <TableCell>
                {u.status === "PENDING" && (
                  <>
                    <Button
                      size="small"
                      onClick={() => updateStatus(u.id, "APPROVED")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => updateStatus(u.id, "REJECTED")}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
};

export default AdminUsers;
