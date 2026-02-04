import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const footerLinks = [
  { label: "Notes", to: "/notes" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "AI Bot", to: "/chatbot" },
  { label: "Login", to: "/login" },
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 8, pb: 6 }}>
      <Divider sx={{ mb: 4, borderColor: "rgba(148, 163, 184, 0.2)" }} />
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              UniTrade
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Building trusted electronics exchanges for campus innovation.
            </Typography>
          </Box>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            {footerLinks.map((link) => (
              <Typography
                key={link.label}
                component={NavLink}
                to={link.to}
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": { color: "text.primary" },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 4, display: "block" }}>
          © {new Date().getFullYear()} UniTrade. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
