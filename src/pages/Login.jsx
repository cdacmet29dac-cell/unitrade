import { useState } from "react";
import { setToken } from "../utils/storage";

const Login = () => {
  const [role, setRole] = useState("student");

  const handleSubmit = (event) => {
    event.preventDefault();
    setToken("demo-token", role);
    window.location.href = "/marketplace";
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
            <input type="email" placeholder="student@college.edu" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" required />
          </label>
          <label>
            Role
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="student">Student</option>
              <option value="hod">HOD</option>
              <option value="admin">Admin</option>
            </select>
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
