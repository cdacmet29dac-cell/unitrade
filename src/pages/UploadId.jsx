import { useEffect, useState } from "react";
import api from "../services/api";

const UploadId = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  // fetch verificationId using stored userId
  useEffect(() => {
    const fetchVerification = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          alert("User not found. Please register again.");
          return;
        }

        const res = await api.get(`/verifications/user/${userId}`);
        setVerificationId(res.data.id);
      } catch {
        alert("Unable to fetch verification details.");
      }
    };

    console.log("userId =", localStorage.getItem("userId"));

    fetchVerification();
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file || !verificationId) {
      alert("Please select ID card");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await api.post(`/files/upload/${verificationId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("ID uploaded successfully. Wait for HOD approval.");
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload ID card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Upload College ID</h1>

        <p className="text-muted">
          Upload your valid college ID card for verification.
        </p>

        <form className="auth-form" onSubmit={handleUpload}>
          <label>
            College ID Card
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>

          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload ID"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="text-muted">
            Your account will be activated after HOD approval.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UploadId;
