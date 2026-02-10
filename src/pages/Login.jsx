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
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { setToken, getRole } from "../utils/storage";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      // 1️⃣ Store token
      setToken(res.data.token);

      // 2️⃣ Get role from token
      const role = getRole();

      // 3️⃣ Redirect based on role
      if (role === "ROLE_STUDENT") {
        navigate("/student");
      } else if (role === "ROLE_HOD") {
        navigate("/hod");
      } else if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/marketplace"); // fallback
      }
    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            {/* Header */}
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                Welcome back 👋
              </Typography>
              <Typography color="text.secondary">
                Sign in to access UniTrade
              </Typography>
            </Box>

            {/* Form */}
            <Stack spacing={2} component="form" onSubmit={submit}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </Stack>

            {/* Footer */}
            <Typography textAlign="center" color="text.secondary">
              Don’t have an account?{" "}
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => navigate("/register")}
              >
                Create one
              </Box>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
