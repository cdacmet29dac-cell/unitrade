import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";

const menuItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Notes", path: "/notes" },
  { label: "Add Notes", path: "/admin/notes-upload" },
];

const AdminNotesUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title || !college || !department || !semester || !file) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload PDF
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await api.post("/files/upload/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const filePath = uploadRes.data;

      // 2️⃣ Save Note
      await api.post("/notes", {
        title,
        description,
        college,
        department,
        semester,
        filePath,
      });

      alert("Notes uploaded successfully");

      // reset
      setTitle("");
      setDescription("");
      setCollege("");
      setDepartment("");
      setSemester("");
      setFile(null);
    } catch {
      alert("Failed to upload notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout menuItems={menuItems}>
      <Container maxWidth="md">
        <Box py={4}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Upload Notes
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Add semester-wise notes for students
          </Typography>

          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Select
                    fullWidth
                    displayEmpty
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  >
                    <MenuItem value="">Select College</MenuItem>
                    <MenuItem value="IIT Mumbai">IIT Mumbai</MenuItem>
                    <MenuItem value="IIT Delhi">IIT Delhi</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Select
                    fullWidth
                    displayEmpty
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <MenuItem value="">Select Department</MenuItem>
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="ENTC">ENTC</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Select
                    fullWidth
                    displayEmpty
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <MenuItem value="">Semester</MenuItem>
                    <MenuItem value="1">Sem 1</MenuItem>
                    <MenuItem value="2">Sem 2</MenuItem>
                    <MenuItem value="3">Sem 3</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="outlined" component="label">
                    Upload PDF
                    <input
                      type="file"
                      hidden
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Button>

                  {file && (
                    <Typography variant="body2" mt={1}>
                      Selected: {file.name}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={submit}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Upload Notes"}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AdminNotesUpload;
