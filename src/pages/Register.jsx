import { useEffect, useState } from "react";
import api from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // master data
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);

  // selected values
  const [collegeId, setCollegeId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [roleId, setRoleId] = useState(1); // STUDENT = 1

  // load colleges
  useEffect(() => {
    const loadColleges = async () => {
      try {
        const res = await api.get("/colleges");
        setColleges(res.data);
      } catch {
        alert("Failed to load colleges");
      }
    };
    loadColleges();
  }, []);

  // load departments when college changes
  useEffect(() => {
    if (!collegeId) {
      setDepartments([]);
      return;
    }

    const loadDepartments = async () => {
      try {
        const res = await api.get(`/colleges/${collegeId}/departments`);
        setDepartments(res.data);
      } catch {
        alert("Failed to load departments");
      }
    };

    loadDepartments();
  }, [collegeId]);

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        phone,
        role: { id: roleId },
        college: { id: collegeId },
        department: { id: departmentId },
      });

      // 🔹 IMPORTANT: store userId for upload-id stepn
      localStorage.setItem("userId", res.data.userId);

      alert("Registration successful. Upload your college ID.");
      window.location.href = "/upload-id";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="text-muted">
          Join UniTrade with your college credentials.
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <label>
            Full name
            <input
              type="text"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="alex@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Set a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>

          {/* SAME UI – just dropdown instead of hidden */}
          <label>
            College
            <select
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              required
            >
              <option value="">Select college</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Department
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              required
            >
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>

          <button className="btn btn--primary" type="submit">
            Register
          </button>
        </form>

        <div className="auth-footer">
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    </section>
  );
};

export default Register;
