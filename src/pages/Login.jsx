import { useState } from "react";
import api from "../services/api";
import { setToken } from "../utils/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      // 1️⃣ Save token
      setToken(token);

      // 2️⃣ Decode role DIRECTLY (no race condition)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      // 3️⃣ Redirect
      if (role === "ROLE_STUDENT") {
        window.location.href = "/marketplace";
      } else if (role === "ROLE_HOD") {
        window.location.href = "/hod";
      } else if (role === "ROLE_ADMIN") {
        window.location.href = "/admin";
      } else {
        alert("Unknown role in token");
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login failed. Please check credentials."
      );
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="text-muted">
          Sign in to access notes, marketplace listings, and project insights.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="student@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className="btn btn--primary" type="submit">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <a href="/register">Create an account</a>
        </div>
      </div>
    </section>
  );
};

export default Login;