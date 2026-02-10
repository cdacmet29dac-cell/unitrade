import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api, { fileUrl } from "../../services/api";
import { getUserId } from "../../utils/storage";

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";

const menuItems = [
  { label: "My Dashboard", path: "/student" },
  { label: "Add Product", path: "/student/add" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Notes", path: "/notes" },
  { label: "AI Project Bot", path: "/chatbot" },
];

const statusColor = (status) => {
  switch (status) {
    case "LIVE":
      return "success";
    case "PENDING_HOD":
      return "warning";
    case "REJECTED":
      return "error";
    default:
      return "default";
  }
};

const StudentDashboard = () => {
  const studentId = getUserId();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get(`/products/student/${studentId}`).then((res) => {
      setProducts(res.data);
    });
  }, [studentId]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    await api.delete(`/products/${id}/student/${studentId}`);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout menuItems={menuItems}>
      {/* Header */}
      <Stack spacing={1} mb={4}>
        <Typography variant="h4" fontWeight={700}>
          My Products
        </Typography>
        <Typography color="text.secondary">
          Products you have listed for HOD approval or sale
        </Typography>
      </Stack>

      {/* Grid */}
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                },
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                height="180"
                image={
                  p.images
                    ? fileUrl(p.images)
                    : "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={p.title}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <Typography fontWeight={600} noWrap>
                    {p.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: 36,
                      overflow: "hidden",
                    }}
                  >
                    {p.description || "No description provided"}
                  </Typography>

                  <Typography variant="h6">₹{p.price}</Typography>

                  <Chip
                    label={p.status.replace("_", " ")}
                    color={statusColor(p.status)}
                    size="small"
                    sx={{ width: "fit-content" }}
                  />
                </Stack>
              </CardContent>

              {/* Actions */}
              <Box p={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete Product
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {products.length === 0 && (
        <Typography color="text.secondary">
          You haven’t added any products yet.
        </Typography>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
