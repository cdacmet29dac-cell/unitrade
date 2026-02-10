import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import api from "../services/api";
import { fileUrl } from "../services/api";

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/live").then((res) => setProducts(res.data));
  }, []);

  return (
    <Box>
      {/* Header */}
      <Stack spacing={1} mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Marketplace
        </Typography>
        <Typography color="text.secondary">
          HOD approved components available for rent or purchase
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
              {/* IMAGE */}
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
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.description || "No description provided"}
                  </Typography>

                  <Typography variant="h6" color="primary">
                    ₹{p.price}
                  </Typography>
                </Stack>
              </CardContent>

              {/* ACTION */}
              <Box p={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=Is this product available? ${p.title}`,
                      "_blank",
                    )
                  }
                >
                  Contact Seller
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <Typography color="text.secondary">
          No products available right now.
        </Typography>
      )}
    </Box>
  );
};

export default Marketplace;
