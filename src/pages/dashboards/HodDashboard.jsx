import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";
import { getUserId } from "../../utils/storage";

import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";

import { fileUrl } from "../../services/api";

const menuItems = [{ label: "Approvals", path: "/hod" }];

const HodDashboard = () => {
  const hodId = getUserId();

  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [students, setStudents] = useState([]);

  // ---------------- LOAD STUDENT APPROVALS ----------------
  useEffect(() => {
    api.get(`/verifications/hod/${hodId}`).then((res) => {
      setStudents(res.data);
    });
  }, [hodId]);

  // ---------------- LOAD PRODUCT APPROVALS ----------------
  useEffect(() => {
    api.get(`/products/hod/${hodId}`).then((res) => {
      setProducts(res.data);
    });
  }, [hodId]);

  // ---------------- STUDENT ACTION ----------------
  const updateStudent = async (id, status) => {
    await api.put(`/verifications/${id}/status?status=${status}`);
    setStudents(students.filter((s) => s.id !== id));
  };

  // ---------------- PRODUCT ACTION ----------------
  const updateProduct = async (id, status) => {
    await api.put(`/products/${id}/status?status=${status}`);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout menuItems={menuItems}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        HOD Approvals
      </Typography>

      {/* ---------- TABS ---------- */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Student Approvals" />
        <Tab label="Product Approvals" />
      </Tabs>

      <Divider sx={{ mb: 3 }} />

      {/* ================= STUDENT APPROVALS ================= */}
      {tab === 0 && (
        <Stack spacing={2}>
          {students.length === 0 && (
            <Typography color="text.secondary">
              No pending student approvals.
            </Typography>
          )}

          {students.map((v) => (
            <Card key={v.id}>
              <CardContent>
                <Typography fontWeight={600}>{v.student.name}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {v.student.email}
                </Typography>

                {v.idCardPath && (
                  <Box mt={1}>
                    <a
                      href={fileUrl(v.idCardPath)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View ID Card
                    </a>
                  </Box>
                )}

                <Stack direction="row" spacing={1} mt={2}>
                  <Button
                    variant="contained"
                    onClick={() => updateStudent(v.id, "APPROVED")}
                  >
                    Approve
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => updateStudent(v.id, "HOLD")}
                  >
                    Hold
                  </Button>
                  <Button
                    color="error"
                    onClick={() => updateStudent(v.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* ================= PRODUCT APPROVALS ================= */}
      {tab === 1 && (
        <Stack spacing={2}>
          {products.length === 0 && (
            <Typography color="text.secondary">
              No pending product approvals.
            </Typography>
          )}

          {products.map((p) => (
            <Card key={p.id}>
              <CardContent>
                <Typography fontWeight={600}>{p.title}</Typography>

                <Typography variant="body2" color="text.secondary">
                  ₹{p.price} · {p.student.name}
                </Typography>

                {p.images && (
                  <Box mt={1}>
                    <img
                      src={fileUrl(p.images)}
                      alt={p.title}
                      style={{
                        width: 120,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                )}

                <Stack direction="row" spacing={1} mt={2}>
                  <Button
                    variant="contained"
                    onClick={() => updateProduct(p.id, "APPROVED")}
                  >
                    Approve
                  </Button>
                  <Button
                    color="error"
                    onClick={() => updateProduct(p.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default HodDashboard;
