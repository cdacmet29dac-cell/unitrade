import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import api, { fileUrl } from "../services/api";

const ProjectBot = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState("");

  const askAI = async () => {
    if (!idea.trim()) return;

    setLoading(true);
    setError("");
    setProducts([]);
    setKeywords([]);

    try {
      const res = await api.post("/ai/project-assist", { idea });
      setProducts(res.data.products || []);
      setKeywords(res.data.suggestedKeywords || []);
    } catch {
      setError("AI service failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        {/* Header */}
        <Stack spacing={1} mb={3}>
          <Typography variant="h4" fontWeight={700}>
            AI Project Assistant
          </Typography>
          <Typography color="text.secondary">
            Describe your project idea and instantly get required components.
          </Typography>
        </Stack>

        {/* Input */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                placeholder="Eg: IoT based smart irrigation system..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />

              <Button
                variant="contained"
                onClick={askAI}
                disabled={loading}
                sx={{ alignSelf: "flex-start" }}
              >
                {loading ? <CircularProgress size={22} /> : "Ask AI"}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Results: Products */}
        {products.length > 0 && (
          <>
            <Typography variant="h5" fontWeight={600} mb={2}>
              Available Products
            </Typography>

            <Grid container spacing={3}>
              {products.map((p) => (
                <Grid item xs={12} sm={6} md={3} key={p.id}>
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
                    <CardContent>
                      <Typography fontWeight={600} noWrap>
                        {p.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ height: 36, overflow: "hidden" }}
                      >
                        {p.description}
                      </Typography>
                      <Typography fontWeight={700} mt={1}>
                        ₹{p.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Results: Keywords */}
        {products.length === 0 && keywords.length > 0 && (
          <>
            <Typography variant="h5" fontWeight={600} mt={4} mb={2}>
              Suggested Components
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {keywords.map((k, i) => (
                <Chip key={i} label={k} />
              ))}
            </Stack>
          </>
        )}

        {/* Error */}
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProjectBot;
