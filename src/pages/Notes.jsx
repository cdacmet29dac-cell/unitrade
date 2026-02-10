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
  Typography,
} from "@mui/material";

import api from "../services/api";

const Notes = () => {
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    if (!college || !department || !semester) {
      alert("Please select all filters");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(
        `/notes?college=${college}&department=${department}&semester=${semester}`,
      );
      setNotes(res.data);
    } catch {
      alert("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        {/* ---------- HEADER ---------- */}
        <Stack spacing={1} mb={3}>
          <Typography variant="h4" fontWeight={700}>
            Notes Library
          </Typography>
          <Typography color="text.secondary">
            Download verified notes uploaded by admins
          </Typography>
        </Stack>

        {/* ---------- FILTER CARD ---------- */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
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

              <Grid item xs={12} md={3}>
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

              <Grid item xs={12} md={3}>
                <Select
                  fullWidth
                  displayEmpty
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <MenuItem value="">Select Semester</MenuItem>
                  <MenuItem value="1">Semester 1</MenuItem>
                  <MenuItem value="2">Semester 2</MenuItem>
                  <MenuItem value="3">Semester 3</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={fetchNotes}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Fetch Notes"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ---------- NOTES LIST ---------- */}
        {notes.length === 0 && !loading ? (
          <Typography color="text.secondary">
            No notes found for selected filters
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography fontWeight={600} gutterBottom>
                      {note.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {note.description}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      href={`http://localhost:8080/api/files/view?path=${encodeURIComponent(
                        note.filePath,
                      )}`}
                      target="_blank"
                    >
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Notes;
