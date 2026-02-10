import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";
import { getUserId } from "../../utils/storage";

const menuItems = [
  { label: "My Products", path: "/student" },
  { label: "Add Product", path: "/student/add" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Notes", path: "/notes" },
  { label: "AI Project Bot", path: "/chatbot" },
];

const AddProduct = () => {
  const studentId = getUserId();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    if (!title || !price || !image) {
      alert("Title, price and image are required");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload image
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await api.post("/files/upload/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2️⃣ Save product
      await api.post(`/products/student/${studentId}`, {
        title,
        description,
        price,
        images: uploadRes.data,
      });

      alert("Product submitted for HOD approval");
      window.history.back(); // smoother than hard reload
    } catch {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout menuItems={menuItems}>
      <Box maxWidth="700px" mx="auto">
        <Typography variant="h4" fontWeight={700} mb={3}>
          Add New Product
        </Typography>

        <Card>
          <CardContent>
            <Stack spacing={3}>
              <TextField
                label="Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />

              <TextField
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />

              <TextField
                label="Price (₹)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />

              {/* IMAGE UPLOAD */}
              <Button variant="outlined" component="label">
                Upload Product Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e.target.files[0])}
                />
              </Button>

              {preview && (
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              )}

              <Button
                variant="contained"
                size="large"
                onClick={submit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit for Approval"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default AddProduct;
