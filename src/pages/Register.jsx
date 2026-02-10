import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [collegeId, setCollegeId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const roleId = 1; // STUDENT

  const [loading, setLoading] = useState(false);

  // Load colleges
  useEffect(() => {
    api.get("/colleges").then((res) => setColleges(res.data));
  }, []);

  // Load departments
  useEffect(() => {
    if (!collegeId) return setDepartments([]);
    api
      .get(`/colleges/${collegeId}/departments`)
      .then((res) => setDepartments(res.data));
  }, [collegeId]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        phone,
        role: { id: roleId },
        college: { id: collegeId },
        department: { id: departmentId },
      });

      localStorage.setItem("userId", res.data.userId);
      alert("Registration successful. Upload your college ID.");
      navigate("/upload-id");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
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
          maxWidth: 480,
          borderRadius: 4,
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            {/* Header */}
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                Create account ✨
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Join UniTrade using your college credentials
              </Typography>
            </Box>

            {/* Form */}
            <Stack spacing={2} component="form" onSubmit={handleRegister}>
              <TextField
                label="Full name"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <TextField
                label="Email"
                placeholder="alex@college.edu"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <TextField
                label="Phone"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <TextField
                select
                label="College"
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                required
              >
                <MenuItem value="">Select college</MenuItem>
                {colleges.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Department"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                required
                disabled={!collegeId}
              >
                <MenuItem value="">Select department</MenuItem>
                {departments.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.2 }}
              >
                {loading ? "Creating account..." : "Register"}
              </Button>
            </Stack>

            {/* Footer */}
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Already have an account?{" "}
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Box>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
