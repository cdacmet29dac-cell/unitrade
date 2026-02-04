import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SecurityIcon from "@mui/icons-material/Security";
import Footer from "../components/common/Footer";

const features = [
  {
    title: "HOD Verified",
    description: "Every listing is reviewed for quality and compliance.",
    icon: <VerifiedIcon fontSize="large" color="primary" />,
  },
  {
    title: "Rent / Buy / Sell",
    description: "Flexible marketplace for components, kits, and devices.",
    icon: <StorefrontIcon fontSize="large" color="primary" />,
  },
  {
    title: "WhatsApp Updates",
    description: "Get instant updates on approvals and request status.",
    icon: <WhatsAppIcon fontSize="large" color="primary" />,
  },
  {
    title: "Notes Download",
    description: "Find curated notes across semesters and labs.",
    icon: <MenuBookIcon fontSize="large" color="primary" />,
  },
  {
    title: "AI Component Suggestions",
    description: "Describe a project and receive a ready parts list.",
    icon: <AutoAwesomeIcon fontSize="large" color="primary" />,
  },
  {
    title: "Secure Payments",
    description: "Protected transactions with transparent pricing.",
    icon: <SecurityIcon fontSize="large" color="primary" />,
  },
];

const steps = ["Sign up with college email", "List or request equipment", "Get verified + delivered"];

const Landing = () => {
  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Chip
                label="Trusted by ENTC departments"
                color="secondary"
                sx={{ alignSelf: "flex-start", fontWeight: 600 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  UniTrade empowers campus innovation with verified electronics.
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h6" color="text.secondary">
                  Discover lab-ready components, share notes, and keep every listing HOD approved
                  before it goes live.
                </Typography>
              </motion.div>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button variant="contained" size="large" href="/marketplace">
                  Explore Marketplace
                </Button>
                <Button variant="outlined" size="large" color="secondary" href="/notes">
                  Download Notes
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 4,
                  p: { xs: 2, md: 3 },
                  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.35)",
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Marketplace Snapshot
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Live listings
                      </Typography>
                      <Typography variant="h4">128</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Components available
                      </Typography>
                      <Typography variant="h4">340+</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        HOD verified requests
                      </Typography>
                      <Typography variant="h4">96%</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 8 } }}>
        <Stack spacing={4}>
          <Typography variant="h4">Everything your department needs</Typography>
          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Card sx={{ bgcolor: "background.paper", height: "100%" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      {feature.icon}
                      <Typography variant="h6">{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 8 } }}>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent>
            <Stack spacing={4}>
              <Typography variant="h4">How it works</Typography>
              <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
          </CardContent>
        </Card>
      </Container>

      <Container maxWidth="lg">
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              alignItems={{ xs: "flex-start", md: "center" }}
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4">Ready to launch your next project?</Typography>
                <Typography variant="body1" color="text.secondary">
                  Join hundreds of students building smarter electronics faster.
                </Typography>
              </Box>
              <Button variant="contained" size="large" href="/register">
                Get started
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </Box>
  );
};

export default Landing;
