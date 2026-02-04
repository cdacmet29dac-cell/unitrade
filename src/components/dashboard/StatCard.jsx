import { Card, CardContent, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

const StatCard = ({ icon, label, value }) => {
  return (
    <Card
      component={motion.div}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: "0 12px 24px rgba(15, 23, 42, 0.35)",
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {icon}
          <div>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h5">{value}</Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatCard;
